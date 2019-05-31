# DDoS
## Introduction

DoS means denial of service, which means the goals of the attack is to interrupt the service. The first 'D' means distributed, which stands for the attack is not from single direction, instead from a dozens of ips and different ports. This is the core concept of DDoS: send a large quantities of requests and exhaust the server's resource thus make it cannot respond to routine request and offline the website.

## Simulation

We developed a website to simulate the CC(Challenge Collapsar) DDos Attack. For the frontend, the user could choose whether to start the attack or stop it. For the backend, standard HTTP requests are sent to the target server very frequently and exhaust the resource of the targeted web server. When the target server is super buzy with dealing with these fake users, the denial-of-service will influence the legitimate users. What's more, by using `grep SYN` we display the connections of server has established simultaneously on the frontend of website. The link of website is: [DDoS page](https://haixiang6123.github.io/security-demo/#/ddos).

## Solutions
### Backup website
The first step to prevent DDoS attack is to have to website that you can backup, or say at least you should have a temperory website. If the server was offlined due to the attack, you are able to switch to the temporary webiste instead of stay at home and cry.
It's not nessessary that the backup website covers all the functions as the original website. It could meet uses temporary requirement if it could be read. For example, it should display the anouncement and tell the users the original server has problem and is under the process of recovery. What's more, it is recommended to deploy the backup website on Github pages or Netlify. Because they have enough bandwidth to face the attack and support binding domain name.
### Block HTTP requests
If the malicious request has special features, it is easy to deal with it simply by blocking it.
In general, there are two features of HTTP request: IP address and User Agent part. For example, if the malicious request is all sent by a certain ip, we could solve the problem by blocking that certain ip.
In the other hand, if their User Agent part has a certain word, we could block the request with the certain word and solve the problem.
To block HTTP request, we could do it in two ways:

 - Firewall
 For operating systems, they all have firewalls. For example, Linux server normally will use iptables. To block the request from IP `1.2.3.4`, we could use the command below:
 
 ```
 $ iptables -A INPUT -s 1.2.3.4 -j DROP
 ```
 
- Web Server

Web Server could also filter requests. To block the requests from IP `1.2.3.4` using Nginx:

```
location / {
  deny 1.2.3.4;
}
```

To block the requests using Apache, we could modify the `.htaccess` file by adding:

```
<RequireAll>
    Require all granted
    Require not ip 1.2.3.4
</RequireAll>
```

### CDN(Content Delivery Network)
CDN is a system that deliver static pages content to different servers and the users could get access to website based on the locations of the user. This could increase the bandwidth and thus avoid DDoS atttack.

As we know, the content of website was stored in the source server and the content on CDN is the cache of the content on the server. The user was only allowed to access CDN and the CDN will send request to source server if the content is not on CDN. In this case, if the CDN's bandwidth is wide enough, it could be possible to defend large quantities of attack. 

