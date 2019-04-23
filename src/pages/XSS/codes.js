export const backendCodes = `// Load mysql driver
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
ResultSet rs = stmt.executeQuery(sql);`
