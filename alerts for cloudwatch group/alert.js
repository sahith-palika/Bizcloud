var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

var zlib = require('zlib');


exports.handler = function(input, context) {

    
    var payload = Buffer.from(input.awslogs.data, 'base64');
    zlib.gunzip(payload, function(e, result) {
        if (e) { 
            context.fail(e);
        } else {
            result = JSON.parse(result.toString());
            //console.log("Event Data:", JSON.stringify(result, null, 2));
            //context.succeed();
        }
        
        console.log(JSON.stringify(result, null, 2));
        
        var message = "The Error is " + '\n'+ JSON.stringify(result, null, 2);
        
        
        var sns = new AWS.SNS();
        sns.publish({
        TopicArn: "arn:aws:sns:us-east-1:083868342691:nodejs-error",
        Message: message
        }, function(err, data) {
        if(err) {
        console.error('error publishing to SNS');
        context.fail(err);
        } else {
        console.info('message published to SNS');
        context.succeed(null, data);
        }
        });
    });
};