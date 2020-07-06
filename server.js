//https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#sendEmail-property

const express = require('express')
const app = express()
const port = 3000

const AWS = require('aws-sdk');
// Set region 
AWS.config.update({region: 'ap-south-1'});

app.get('/', (req, res) => {
        // Create listIdentities params 
        let params = {
            MaxItems: 10
        };
        
        // Create the promise and SES service object
        let listIDsPromise = new AWS.SES({apiVersion: '2010-12-01'}).listIdentities(params).promise();
        
        // Handle promise's fulfilled/rejected states
        listIDsPromise.then( (data) => {
                                        res.send(data);
                    
                                        })
        .catch(  (err) => {
                    res.send( err.stack);
                });
  })

  app.get('/verificationAttributes', (req, res) => {
    // Create listIdentities params 
    let params = {
        Identities: [req.query.email]
    };
    
    // Create the promise and SES service object
    let listIDsPromise = new AWS.SES({apiVersion: '2010-12-01'}).getIdentityVerificationAttributes(params).promise();
    
    // Handle promise's fulfilled/rejected states
    listIDsPromise.then( (data) => {
                                    res.send(data);
                
                                    })
    .catch(  (err) => {
                res.send( err.stack);
            });
})


app.get('/deleteIdentity', (req, res) => {
    // Create listIdentities params 
    let params = {
        Identity: req.query.email
    };
    
    // Create the promise and SES service object
    let listIDsPromise = new AWS.SES({apiVersion: '2010-12-01'}).deleteIdentity(params).promise();
    
    // Handle promise's fulfilled/rejected states
    listIDsPromise.then( (data) => {
                                    res.send(data);
                
                                    })
    .catch(  (err) => {
                res.send( err.stack);
            });
})


  app.get('/emailVerify', (req, res) => {
      
        let data  = {
            EmailAddress: req.query.email
         };
         console.log(data);
         // Create the promise and SES service object
         let verifyEmailPromise = new AWS.SES({apiVersion: '2010-12-01'}).verifyEmailIdentity(data).promise();
         
         // Handle promise's fulfilled/rejected states
         verifyEmailPromise.then(
                 (data) => {
                     res.send(data);
                     
                  }).catch(
                     (err) => {
                         //console.error(err, err.stack);
                         res.send( err.stack);
                 });
   })
 

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))