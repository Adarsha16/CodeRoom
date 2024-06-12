# Server Setup

**Start** <br>
```sh
npm install
npm start
```

**.env setup**<br>
```sh
DB_HOST = localhost
DB_USER = root
DB_PASS = <password>
DB_NAME = <database_name>
DB_TABLE_NAME = <table_name>


DB_OTP_TABLE_NAME = otpverification
OTP_EMAIL_SENDER = <Email for sending otp>
OTP_APP_PASSWORD = <Application Pass, DO NOT SHARE>
OTP_EXPIRY = 5 #mins



JWT_SECRET = <jwt_secret_key>
JWT_LIFETIME = <jwt_lifetime>
```

**Note**

*Default Port : 5001*