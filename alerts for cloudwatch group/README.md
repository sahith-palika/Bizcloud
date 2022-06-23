# Set an Email Alerts when we get a Error in CloudWatch log group

- Initially, configure the lambdas with tags and create a cloudwatch log group.
- CloudWatch Logs captures the logs from all these Lambda functions.
- It invokes the lambda function that process the required data and sends an sns alert to the email

## Setting Up the yml file:

- In line 8 change the log group name.
- In line 51 edit the SNS Endpoint to the required email address.
