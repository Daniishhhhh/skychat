const awsExports = {
  Auth: {
    Cognito: {
      region: 'us-east-1',                    // YOUR AWS REGION
      userPoolId: 'us-east-1_BxNL67LTz',         // YOUR USER POOL ID
      userPoolClientId: '5s4cdt6h3jmgek3d9oiqe5609s'          // YOUR APP CLIENT ID (note: changed from userPoolWebClientId)
    }
  }
};

export default awsExports;
