---
title: Building a link shortener
author: Mohit Singh
date: '2022-07-27'
excerpt: A while back, I was asked to write a link shortener for a startup. It took me a day to come up with a production ready version but I warned them about collisions and other possible limitations.
---

A while back, I was asked to write a link shortener for a startup. It took me a day to come up with a production ready version, but I warned them about collisions and other possible limitations. I used [nanoid][nanoid] to generate IDs. They asked me to use Mongo along with Express, and I did so. Not the best choice due to limited opportunity of optimizations.

Fast-forward a few months, that link shortener was performing well on a two core ec2 instance. I left that startup later, but one problem that stuck with me was collisions. They used to face errors due to collisions. Collisions increased with time, having some business impact.

## Rebuilding

Later, I decided to write an open source link shortener. I picked [Fiber][fiber] (Go) and PostgreSQL instead of Express and Mongo[^1]. After some hours, I had a working link shortener, which was already faster and reliable than what I created previously. I still had to fix a few things &mdash;

- Reducing lookup time
- Minimizing failures
- Increasing creation speed
- Increasing retrieval speed
- Adding analytics

## Reducing lookup time

Database lookup before creating every link was problematic. I decided to fix it first. After some digging, I came across [Probabilistic Data Structures][pds]. The possible candidates were [Bloom Filters][bf], [Cuckoo Filters][cf] and [Quotient Filters][qf]. After some testing and thinking, I picked [Bloom Filters][bf].

I used [bloom][bloom] after writing a thread-safe wrapper around it. By using that to lookup before generating IDs, the lookup time reduced significantly.

## Minimizing failures

When [Bloom Filters][bf] helped reduce lookup time, I figured out that I can utilize this reduced lookup time to minimize failures due to collisions. I implemented a recursive fallback ID generator with limit. Now, failures due to collisions were reduced, and this link shortener was almost fail-safe, yet much faster than previous one.

By now, I implemented a way to back up and restore these bloom filters. In case of missing backup, I generated bloom-filters from database.

## Increasing creation speed

Since I was no longer using the database for checking the existence of an ID, the only db query left was `create` query for link. Upon thinking about ways to speed this up, goroutines came in mind. I created a worker to queue and batch insert IDs. Now, for every link creation request, the link data was pushed in batch with the help of channels and since there was no collision of generated ID. This approach worked, and creation speed went up by a few times.

## Increasing retrieval speed

Now that my link creation speed was way higher than retrieval, I wanted to optimize retrieval too, but I was limited by db connections. I tuned my PostgreSQL instance to have around 3000 connections[^2]. This worked, but retrieval wasn't that fast. It still isn't, but the possible solution is to put these ID link pairs in Redis and use that. The insertion can be done on startup ( Any better ideas ? ).

## Adding analytics

Since the real benefit of link shortener for businesses was to extract data and analyze traffic from these links. I decided to implement that too. I was already getting IP and User-Agent. All I needed was a user-agent parser and an IP info parser. I found [a good parser][ua] for user agents and used [GeoLite2][geolite2] from MaxMind to parse IP info. Since every click had info, I decided to implement a worker pool and sent data there for paring and batch ingestion to avoid request slowdowns.

I picked [Timescale][ts] since it was already PostgreSQL based and was fast enough. [^3]. The workers ingested events fine, and I had a good amount of data-points for every single click.

## A crazy idea

At some point, I thought about generating all IDs beforehand, randomizing them and using that to create links. No collisions at all. That could be stored in a few GB.

## Making it somewhat distributed

So far, the system worked fine but then I had some new questions &mdash;

- It was still hard to scale and prone to collisions. Can we build a faster but complete collision free system ?
- Bloom-Filters did a good job, but is it a good generate IDs at request time ?
- What if I want to scale a specific portion.

## Breaking into pieces

After some thinking and punching through walls, I came with a seemingly distributed architecture which had three services &mdash;

- **Generator** - Generates IDs and pass them to those who request.
- **Director** - Directs to correct links and passes information to Timescale.
- **Creator** - Handles creation and other modifications of short links.

I started implementation of each.

### Generator

The one took longer than I expected. It further contains several pieces &mdash;

- **Bucket** - A custom data-structure which contains a two dimensional slice for holding IDs, one for number of buckets and other for capacity and a synchronized map to keep record of bucket states.
- **Bloom** - A thread-safe wrapper around bloom-filter.
- **Factory** - The primary pieces which exposes gRPC method to retrieve one bucket full of IDs at time and fills buckets as they get empty

Now, this service keeps generating IDs as we request more IDs from It. This way, we always end up with enough pre-generated IDs with no collisions.

To scale it, we can make our bloom-filters distributed and use gRPC for its operations, but for now it works well even for generating millions of IDs in my limited testing.

### Creator

For this one, most of the old got reused to build this. Although, I had to introduce several new pieces to make it horizontally scalable &mdash;

- **Ingestor** handles batch insertion of created links based on a limited and a timed fallback.
- **Reserve** keeps a bucket full of IDs and when a bucket gets empty, it calls the generator to request new bucket through gRPC.

With a request handler combined with this, I fired `wrk` only to find that I had several collisions. I suspected that my slice operation on bucket was concurrent causing it to return duplicate IDs. A mutex later, it was fixed and then came another issue. Several IDs were failing to generate. It was easy to spot as the number of failed requests was same as no of requested bucket. I added some delay in main request when bucket was requested. Now, every request was processed without failure.

The system was able to create 7-8 Million links during several one minute tests. It was a huge improvement over my previous attempt which could only generate around 2-3 Million links in a minute with same resource usage. Added benefit with this is that I can scale this service horizontally along with some database replication.

### Director

Director was rather simple since it was already independent of rest of the system. All I had to do was to decouple it from old code. After adding redis as caching layer over postgres I was able to double request handling. I excepted better but perhaps running everything on a single system for wasn't a good idea for this test. The good part is that this too scales horizontally.

## Conclusion

I named this after **Wormholes**, the imaginary links between two distant points in space. The code is [open source](https://github.com/mohitsinghs/wormholes), so you can always have a look. I learned a few memory and optimization techniques during this and witnessed my failures multiple times. Learning is a continuous process like workout. We can never expect to get done either.

I'm still left with some questions &mdash;

- Can we deploy it to k8s ?
- What other ways are there to make this even more fast and reliable ?
- How Cassandra, Scylla and Druid will perform compared to current database choices ?
- Should we use tools like Metabase, Superset, Redash etc to visualize, or a custom dashboard with auth will work better ?

[nanoid]: https://github.com/ai/nanoid
[fiber]: https://github.com/gofiber/fiber
[pds]: https://en.wikipedia.org/wiki/Category:Probabilistic_data_structures
[bf]: https://en.wikipedia.org/wiki/Bloom_filter
[cf]: https://en.wikipedia.org/wiki/Cuckoo_filter
[qf]: https://en.wikipedia.org/wiki/Quotient_filter
[dablooms]: https://github.com/bitly/dablooms
[bloom]: https://github.com/bits-and-blooms/bloom
[pgtune]: https://pgtune.leopard.in.ua/
[ua]: https://github.com/mssola/user_agent
[geolite2]: https://dev.maxmind.com/geoip/geoip2/geolite2/
[ts]: https://github.com/timescale/timescaledb
[druid]: https://github.com/apache/druid

[^1]: A database that I try to avoid
[^2]: Since, just bumping `max_connections` doesn't work. I used [PGTune][pgtune] to generate config for 3000 connections.
[^3]: I admit there were better choices and [Druid][druid] is one of my favorites, but that's a pain to maintain.
