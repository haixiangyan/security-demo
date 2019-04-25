# SQL Injection

## Introduction

Many entry-level developers may not notice the SQL injection problem when they are developing the backend. For example, the frontend just pass all the 
information that user enters without any validation and checking. The backend just process these information on database operation, which may cause the SQL
Injection attack.

## Simulation

We develop a basic website to simulate the SQL attack. For the frontend, there is a search input box for user searching other user by entering user name.
After entering the keyword, frontend will send a HTTP request to backend, attaching that keyword. Receiving the keyword, backend will use it to generate a
SQL query statement and make a query. Then it will return a HTTP response with query results. 

Let's assume backend codes are written by Java and use JDBC to make query.

```java
// Load mysql driver
Class.forName("com.mysql.jdbc.Driver");

// Connect to database
Connection conn = DriverManager.getConnection(URL, NAME, PASSWORD);

// Get user name
String userName = request.getParameter("userName");

// Generate sql code (Dangerous)
String sql = "select * from user
where user_name = '" + userName + "'";

// Make query
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(sql);
```

In the demo, user can do SQL injection by putting following "keywords" in the search input box.

* '; drop database 'user
* '; delete user where '1' = '1

The SQL query statement will turn to 

```sql
select * from user where user_name = ''; drop database 'user'

or

select * from user where user_name = ''; delete user where '1' = '1'
```

The first SQL statement will drop the whole "user" datbase, and the second one will query all users from "user". That's how the SQL Injection Attack works.


## Solution

Here are some solutions to prevent SQL Injection Attack.

### Prepared Statement

JDBC provides a useful class called `PreparedStatement`. It can avoid using parameter to generate SQL statement directly. So the backend codes can be changed to this

```java
// Get user name
String userName = request.getParameter("userName");

// Generate sql prepared statement
String sql= "select * from users where user_name=?";
PreparedStatement preState = conn.prepareStatement(sql);

// Set parameter
preState.setString(1, userName);

ResultSet rs = preState.executeQuery();
```

In addition to prevent attack. Prepared Statement can improve readability, maintenance and enhance query performance.

### Regular Expression

Using prepared statement is the last method to prevent SQL Injection. In fact, developers are supposed to do validation
for information that user enters in the frontend and backend. After doing research on the Internet, here are some
useful regular expression to detect SQL Injection:

* Use for detecting SQL meta-characters: `/(\%27)|(\’)|(\-\-)|(\%23)|(#)/ix`

* Use for detecting MS SQL Injection: `/exec(\s|\+)+(s|x)p\w+/ix` 


When frontend or backend detect a possible attack, the website should let user enters other keywords.

### Filtering

Filtering keyword or string is an alternative of using regular expression. It is mainly used for detecting 
keywords of SQL statement. Java implementation is as followed:

```java
String evilStr = "'|and|exec|insert|select|delete|update|count|*|%|chr|mid|master|truncate|char|declare|;|or|-|+|,";  
String evilStrList[] = split(evilStr,"|");  
for (int i=0 ; i < evilStrList.length ; i++ )  
{  
    if (str.indexOf(evilStrList[i])>=0) {  
        return true;  
    }  
    else {  
        return false;  
    }
}
```