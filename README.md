# AWS EC2 Load Balancer – Node.js

## Project Overview

This project demonstrates how to deploy a Node.js application on AWS EC2 using two separate instances and an Application Load Balancer (ALB).

The main objective is to distribute incoming HTTP requests across multiple EC2 instances instead of depending on a single server.

This setup demonstrates basic load balancing, server availability, target health monitoring, and AWS networking security.

## Architecture

```text
                 Client / Browser
                        |
                        |
                 Application Load
                    Balancer
                        |
                        |
                   Target Group
                    /       \
                   /         \
                  /           \
          EC2 Instance 1    EC2 Instance 2
             Ubuntu            Ubuntu
               |                 |
            Node.js           Node.js
               |                 |
            Express           Express
               |                 |
          Application       Application
```

## AWS Services Used

### 1. Amazon EC2

Created two separate EC2 instances running Ubuntu.

- EC2 Instance 1 – Runs the Node.js application.
- EC2 Instance 2 – Runs the same Node.js application.

Both instances serve application requests independently.

### 2. Application Load Balancer (ALB)

Created an Application Load Balancer to receive incoming HTTP requests.

Responsibilities:
- Accept incoming client requests.
- Forward requests to registered EC2 instances.
- Distribute requests across healthy targets.
- Perform health checks through the Target Group.

### 3. Target Group

Created a Target Group and registered both EC2 instances.

Responsibilities:
- Maintain registered targets.
- Monitor target health.
- Check application availability using health-check requests.
- Forward traffic only to healthy targets.

### 4. Security Groups

Configured Security Groups to control network traffic.

**Load Balancer Security Group**
- Allows incoming HTTP traffic.
- Controls access to the Load Balancer.

**EC2 Security Group**
- Allows application traffic from the Load Balancer.
- Controls access to the EC2 instances.

### 5. Ubuntu

Used Ubuntu as the operating system on both EC2 instances to host the Node.js applications.

## How It Works

1. A client sends an HTTP request to the Load Balancer DNS.
2. The Application Load Balancer receives the request.
3. The Load Balancer checks the registered targets' health.
4. It forwards the request to a healthy EC2 instance.
5. The Node.js application processes the request.
6. The response is returned to the client through the Load Balancer.

## Health Checks

Configured health checks to monitor the availability of both Node.js applications.

For example:

```http
GET /ping
```

If an instance responds with the configured successful HTTP status code, it can be marked Healthy.

If an instance becomes unhealthy, the Load Balancer stops routing normal traffic to that target until it becomes healthy again.

## Key Concepts Learned

- AWS EC2 instance creation and configuration.
- Connecting to Ubuntu EC2 instances using SSH.
- SSH key-based authentication using PEM files.
- Installing and running Node.js on Ubuntu.
- Application Load Balancer configuration.
- Target Group registration.
- Security Group configuration.
- HTTP request distribution.
- Load Balancer health checks.
- Healthy and Unhealthy target states.
- Basic multi-instance application deployment.

## Project Outcome

Successfully deployed the same Node.js application on two separate EC2 instances and connected both instances to an AWS Application Load Balancer through a Target Group.

The Load Balancer distributes incoming requests across healthy instances, providing a foundation for horizontal scaling and improved application availability.

## Future Improvements

- Configure Nginx as a reverse proxy.
- Configure HTTPS using AWS Certificate Manager.
- Implement automatic deployment using GitHub Actions (CI/CD).
- Configure Auto Scaling Groups.
- Add CloudWatch monitoring and alarms.
- Implement production-ready application logging.
