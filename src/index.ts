import * as cert from 'aws-cdk-lib/aws-certificatemanager';
import { Construct } from 'constructs';
import { auth } from './auth';
import { backend } from './backend';
import { backendAnalytics } from './backendAnalytics';
import { frontend } from './frontend';


export interface SwaAuthBasicAuth {
  /**
   * The username to use for basic auth.
   */
  readonly username: string;
  /**
   * The password to use for basic auth.
   */
  readonly password: string;
}

export interface SwaAuthCognitoUser {
  /**
   * The name of the user.
   */
  readonly name: string;
  /**
   * The email of the user used as the username.
   */
  readonly email: string;
}
export interface SwaAuthCognito {
  /**
   * An array of users that are allowed to login.
   */
  readonly users: SwaAuthCognitoUser[];
}

/**
 * The auth configuration which defaults to none. If you want to enable auth, you can specify either basic auth or
 * cognito auth but not both.
 */
export interface SwaAuth {
  /**
   * The basic auth configuration.
   */
  readonly basicAuth?: SwaAuthBasicAuth;
  /**
   * The cognito auth configuration.
   */
  readonly cognito?: SwaAuthCognito;
}


/**
 * The AWS environment (account and region) to deploy to.
 */
export interface AwsEnv {
  readonly account: string;
  readonly region: string;
}

/**
 * Info about the domain to use for the site. Defaults to an autogenerated `cloudfront.net` domain. You can read the
 * website URL from the stack output.
 */
export interface Domain {
  readonly name: string;
  readonly certificate: cert.Certificate;
}

export interface SwaProps {

  /**
   * The AWS environment (account and region) to deploy to.
   */
  readonly awsEnv: AwsEnv;

  /**
   * The list of allowed sites. This does not have to be a domain name, it can also be string. It can be anything
   * you want to use to identify a site. The client side script that send analytics will have to specify one of these\
   * names.
   */
  readonly sites: string[];

  /**
   * The origins that are allowed to make requests to the backend `api-ingest` API. This CORS check is done as an extra
   * security measure to prevent other sites from making requests to your backend.
   */
  readonly allowedOrigins: string[];

  /**
   * The auth configuration which defaults to none. If you want to enable auth, you can specify either basic auth or
   * cognito auth but not both.
   */
  readonly auth?: SwaAuth;

  /**
   * A string added as a tag to the Lambda function to appear in logs
    */
  readonly environment: string;

  /**
   * Info about the domain to use for the site. Defaults to an autogenerated `cloudfront.net` domain. You can read the
   * website URL from the stack output.
   */
  readonly domain?: Domain;
}

export class Swa extends Construct {
  constructor(scope: Construct, id: string, props: SwaProps) {
    super(scope, id);

    function name(resourceId: string): string {
      return id + '-' + resourceId;
    }

    const authProps = auth(scope, name, props);
    const backendAnalyticsProps = backendAnalytics(scope, name, props);
    const backendProps = backend(scope, name, props, authProps, backendAnalyticsProps);
    frontend(scope, name, props, authProps, backendProps);
  }
}

export default Swa;