---
title: "Microservices Notes"
date: 2019-01-12T20:20:00-05:00
draft: true
---

# What is a microservice?



# Why do we need microservices?

- Functional changes affect only one microservice.
- Teams are able to fully own a set of functionality.
- Quicker iteration, microservices can be deployed easily.
-

# What are the weaknesses of microservices?

# Service Discovery

# Load Balancing

# Message Encoding and Transport

- HTTP
- GRPC
- Protobuf
- Thrift

Single responsibility principle
Autonomous/isolated
Single team oriented

Advantages:
Technology heterogenous
Resilience
Scalability
Continuous deployment
Organisational alignment
Composability
Replaceability

Disadvantages:
Complexities of a distributed system
Infrastructure and tooling is difficult

Focus on the infrastructure between services:
Communication protocol
Health checks

Attributes:
Monitoring: emit health and metrics (push to nagios or graphite)
Logging: centralised (logstash or zipkin)
Interface: protocol, pagination, versioning
Safety: shield from downstream calls

Exemplar service/template
Starting point
Good documentation
Best practices

Loose coupling:
Change in one service doesn't necessitate a change in another
Pick integration styles carefully
Limit knowledge of each service to the bare minimum

High cohesion:
Related behaviour should sit together
Changes should touch only small parts of the system

Bounded context:
Contexts choose to expose some of their models via well defined interfaces
Shared vs hidden models
Internal vs external representation
Coarse grained -> subdivide into nested contexts

Integration:
Avoid breaking changes
Keep your APIs technology agnostic
Make your service simple for consumers
Hide internal implementation details

- Shared Database:
Tight coupling
No cohesion
Brittle
Not technology agnostic

- Synchronous vs asynchronous
Sync: request/response, waiting, orchestration required
Async: Event driven, subscriptions, choreography

- RPC
Remote calls are different from local calls
Client and Server stubs are brittle, any change must touch both
Exposes internal implementation details
Often tied to a particular technology

- REST over HTTP
Good tooling for caching, security
Verbs force good REST design
* Bad latency
* No client generated stubs

- Event based
Message broker (RabbitMQ) to handle events and subscriptions
Keep middleware dumb and endpoints smart
Competing consumers pattern (each worker gobbles messages as fast as possible)

- Complexities Event Driven Architecture
Retry limit
What to do with failed messages (put in failed queue and retry if needed)
Ensure good monitoring is in place using correlation IDs

- Perils of DRY
If shared code leaks across service, coupling has been introduced
Don't violate DRY within a microservice but be careful across services

- Access by reference:
Using an event queue can mean some actions are outdated when they are processed
To mitigate this, pass resources by reference using a URI if possible

- Versioning
Defer breaking changes
Don't bind too tightly to server responses
Use consumer driven contracts to catch breaking changes early
Use semantic versioning
Coexist different versions of endpoints (expand and contract)

- User interfaces
Use an API gateway to consolidate underlying service calls (one for each UI, backends for frontends)
Have services send widgets to UI to be rendered


- External Integrations
CMS: Build facade service which wraps CMS and sends static content
CRM: Build a facade for each CRM entity


Breaking up monoliths:
- Identify seams
- Move each context into a package
- Move ORM database mapping into each package
- Break foreign key references by calling the corresponding service instead (make sure you handle constraints within the service)
- Move shared static data into configuration files within a service
- Shared Data: Make new entity service and access it via this service
- Shared Table: Split the table one for each service
- Split the schema per planned service

- Transaction boundary:
Eventual consistency: queue the request and retry
Abort the entire operation: fire a compensating transaction to undo committed changes
Distributed transactions: Central process coordinates with cohorts and commits a transaction only if all cohorts vote Yes (blocking, central point of failure)
Try your best not to split up services that need transcations

- Reporting:
Data pump
Event data pump (send out events on change to subscribed data pump mapper)

Deployment:
- CI: check into mainline daily, run validation tests & build artifacts
- Single CI build for each microservice
- CD: treat every check-in as a release candidate (test -> UAT -> perf tests -> prod)
- Immutable server

- Service config:
Build one artifact but manage config outside the service
Use a dedicate config management system

- Application containers:
Technology constraint
Session state should be avoided
Limited monitoring options
Lifecycle management issues

- Automation
Deploy with one command, specify: environment, artifact and configuration

Testing:
- Unit test: test individual functions or methods (quick feedback)
- Service tests: test individual services, stub out external collaborators or use test DB
- End-to-end tests: Run against the entire system. Drive a UI.

- Service tests:
stub vs mock
Stub: return fake data
Mock: expectations and assertions on methods being called

- End to end tests:
Fan-in tests, trigger end to end tests any time a service changes (after completing local service tests)
Flaky tests: fail sometimes pass sometimes, remove these tests no confidence
Treat e-2-e tests as a shared codebase

- Consumer driven tests
Test each service with a particular user's requirements in mind
Stub out up and downstream services

- Blue green depolyment
Keep new and old releases deployed
Smoke test new release
switch traffic to new release

- Canary release
Run new and old release parallel to each other
Compare the outputs as they run
Switch over to new release after a long time validating


Monitoring

- Log everything centrally (logstash)
- Extract information from centrally stored logs (Kibana)
- Consolidate metrics across different services (Graphite)
- Service metrics: response times, error rates, basic statistics on usage and application metrics
- Semantic monitoring: include fake records that trigger expected monitoring checks, if these fail then the monitor will alert of system failure

- Correlation IDs:
generate GUID for each call, pass to subsequent calls

- Cascade:
Each service should expose the health of its downstream services
Each service should expose the response time of downstream calls and their error rates (use hystrix)


Security

- Authentication: Confirm that someone is who they say they are
- Authorization: Map person to allowed actions
- SSO: SAML and OpenID, authenticate with identity provider

- SSO Gateway
Gateway handles authentication and proxies calls downstream
Adds headers to indicate authentication and authorization details
Single point of failure, doesn't handle intrusion detection or firewalling

- HTTPS basic auth
HTTP over TLS
Must manually manage certificates
Certificates cannot be easily revoked
SSL cannot be easily cached (fix: terminate SSL on load balancer and cache behind it)

- Open ID
Service accounts for each service
Services authenticate with central directory

- API Keys
Public private keys are handled centrally

- Deputy problem
Tricking a deputy service into making calls to a downstream service
Pass the principal's credentials downstream if possible

- Securing stored data
Salt password hashing
Use a key management solution for services


Microservices at scale

-Timeouts
Add timeouts to all out of process calls
Choose a default timeout for everything
Log when timeout occurs

-Retry
retry requests with progressive backoff and jitter

-Circuit breaker
Starts closed allowing requests
When a threshold of failures occurs, circuit is opened
After an elapsed time, test requests are sent to check
If healthy response threshold is met, circuit breaker is closed

-Scaling:
Vertical: larger machines, more cpus, more ram
Split services into smaller services
Make sure copies of a service run on different hosts

- Load balancing
SSL termination
VLAN, isolate load balancer and services, traffic can only flow into VLAN through SSL terminated load balancer

-Worker based systems
Workers handle async tasks or task queues
Can be spawned when load increases

- Scaling DBs:
Availability vs Durability
+ Reads
Caching
Read replicas (replica nodes)
Eventual consistency
+ Writes
Sharding: Hash data, use key to pick a node to store the data in
Queries make sharding complex: map reduce
Adding new shards often requires downtime (cassandra can help)
Sharding doesn't help with resiliency (cassandra helps by replicating to multiple nodes)

- CQRS
Separate commands from queries
Use event sourcing to store incoming commands in a queue and replay them

Caching

- Client side: client decides on when to fetch data, caches results
- Proxy caching: proxy is placed between server and client and caches
- Server side: server handles caching responsibility (memcached, varnish)

- HTTP Caching
cache-control directive (TTL)
Expires header
ETags

- Caching for writes
write-behind cache

