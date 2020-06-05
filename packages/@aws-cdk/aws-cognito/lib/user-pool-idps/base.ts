import { Construct, Resource } from '@aws-cdk/core';
import { StandardAttribute } from '../private/standard-attr';
import { IUserPool } from '../user-pool';
import { IUserPoolIdentityProvider } from '../user-pool-idp';

export class ProviderAttribute {
  public static readonly AMAZON_USER_ID = new ProviderAttribute('user_id');
  public static readonly AMAZON_EMAIL = new ProviderAttribute('email');
  public static readonly AMAZON_NAME = new ProviderAttribute('name');
  public static readonly AMAZON_POSTAL_CODE = new ProviderAttribute('postal_code');

  public static readonly FACEBOOK_ID = new ProviderAttribute('id');
  public static readonly FACEBOOK_BIRTHDAY = new ProviderAttribute('birthday');
  public static readonly FACEBOOK_EMAIL = new ProviderAttribute('email');
  public static readonly FACEBOOK_NAME = new ProviderAttribute('name');
  public static readonly FACEBOOK_FIRST_NAME = new ProviderAttribute('first_name');
  public static readonly FACEBOOK_LAST_NAME = new ProviderAttribute('last_name');
  public static readonly FACEBOOK_MIDDLE_NAME = new ProviderAttribute('middle_name');
  public static readonly FACEBOOK_GENDER = new ProviderAttribute('gender');
  public static readonly FACEBOOK_LOCALE = new ProviderAttribute('locale');

  public static custom(attributeName: string): ProviderAttribute {
    return new ProviderAttribute(attributeName);
  }

  public readonly attributeName: string;

  private constructor(attributeName: string) {
    this.attributeName = attributeName;
  }
}

export interface AttributeMapping {
  /**
   * The user's postal address is a required attribute.
   * @default false
   */
  readonly address?: ProviderAttribute;

  /**
   * The user's birthday.
   * @default false
   */
  readonly birthdate?: ProviderAttribute;

  /**
   * The user's e-mail address.
   * @default false
   */
  readonly email?: ProviderAttribute;

  /**
   * The surname or last name of user.
   * @default false
   */
  readonly familyName?: ProviderAttribute;

  /**
   * The user's gender.
   * @default false
   */
  readonly gender?: ProviderAttribute;

  /**
   * The user's first name or give name.
   * @default false
   */
  readonly givenName?: ProviderAttribute;

  /**
   * The user's locale.
   * @default false
   */
  readonly locale?: ProviderAttribute;

  /**
   * The user's middle name.
   * @default false
   */
  readonly middleName?: ProviderAttribute;

  /**
   * The user's full name in displayable form.
   * @default false
   */
  readonly fullname?: ProviderAttribute;

  /**
   * The user's nickname or casual name.
   * @default false
   */
  readonly nickname?: ProviderAttribute;

  /**
   * The user's telephone number.
   * @default false
   */
  readonly phoneNumber?: ProviderAttribute;

  /**
   * The URL to the user's profile picture.
   * @default false
   */
  readonly profilePicture?: ProviderAttribute;

  /**
   * The user's preferred username.
   * @default false
   */
  readonly preferredUsername?: ProviderAttribute;

  /**
   * The URL to the user's profile page.
   * @default false
   */
  readonly profilePage?: ProviderAttribute;

  /**
   * The user's time zone.
   * @default false
   */
  readonly timezone?: ProviderAttribute;

  /**
   * Time, the user's information was last updated.
   * @default false
   */
  readonly lastUpdateTime?: ProviderAttribute;

  /**
   * The URL to the user's web page or blog.
   * @default false
   */
  readonly website?: ProviderAttribute;

  /**
   * Specify custom attribute mapping here and mapping for any standard attributes not yet supported.
   */
  readonly custom?: { [key: string]: ProviderAttribute };
}

/**
 * Properties to create a new instance of UserPoolIdentityProvider
 */
export interface UserPoolIdentityProviderProps {
  /**
   * The user pool to which this construct provides identities.
   */
  readonly userPool: IUserPool;

  /**
   * Mapping attributes from the identity provider to standard and custom attributes of the user pool.
   */
  readonly attributeMapping?: AttributeMapping;
}

/**
 * Options to integrate with the various social identity providers.
 */
export abstract class UserPoolIdentityProviderBase extends Resource implements IUserPoolIdentityProvider {
  public abstract readonly providerName: string;

  public constructor(scope: Construct, id: string, private readonly props: UserPoolIdentityProviderProps) {
    super(scope, id);
    props.userPool.registerIdentityProvider(this);
  }

  protected attributeMapping(): any {
    if (!this.props.attributeMapping) {
      return undefined;
    }
    const providedMapping = this.props.attributeMapping;
    let resultMapping = {};
    if (providedMapping.address) {
      resultMapping = { [`${StandardAttribute.ADDRESS}`]: providedMapping.address.attributeName, ...resultMapping };
    }
    if (providedMapping.birthdate) {
      resultMapping = { [`${StandardAttribute.BIRTHDATE}`]: providedMapping.birthdate.attributeName, ...resultMapping };
    }
    if (providedMapping.email) {
      resultMapping = { [`${StandardAttribute.EMAIL}`]: providedMapping.email.attributeName, ...resultMapping };
    }
    if (providedMapping.familyName) {
      resultMapping = { [`${StandardAttribute.FAMILY_NAME}`]: providedMapping.familyName.attributeName, ...resultMapping };
    }
    if (providedMapping.fullname) {
      resultMapping = { [`${StandardAttribute.NAME}`]: providedMapping.fullname.attributeName, ...resultMapping };
    }
    if (providedMapping.gender) {
      resultMapping = { [`${StandardAttribute.GENDER}`]: providedMapping.gender.attributeName, ...resultMapping };
    }
    if (providedMapping.givenName) {
      resultMapping = { [`${StandardAttribute.GIVEN_NAME}`]: providedMapping.givenName.attributeName, ...resultMapping };
    }
    if (providedMapping.lastUpdateTime) {
      resultMapping = { [`${StandardAttribute.LAST_UPDATE_TIME}`]: providedMapping.lastUpdateTime.attributeName, ...resultMapping };
    }
    if (providedMapping.locale) {
      resultMapping = { [`${StandardAttribute.LOCALE}`]: providedMapping.locale.attributeName, ...resultMapping };
    }
    if (providedMapping.middleName) {
      resultMapping = { [`${StandardAttribute.MIDDLE_NAME}`]: providedMapping.middleName.attributeName, ...resultMapping };
    }
    if (providedMapping.nickname) {
      resultMapping = { [`${StandardAttribute.NICKNAME}`]: providedMapping.nickname.attributeName, ...resultMapping };
    }
    if (providedMapping.phoneNumber) {
      resultMapping = { [`${StandardAttribute.PHONE_NUMBER}`]: providedMapping.phoneNumber.attributeName, ...resultMapping };
    }
    if (providedMapping.preferredUsername) {
      resultMapping = { [`${StandardAttribute.PREFERRED_USERNAME}`]: providedMapping.preferredUsername.attributeName, ...resultMapping };
    }
    if (providedMapping.profilePage) {
      resultMapping = { [`${StandardAttribute.PROFILE_URL}`]: providedMapping.profilePage.attributeName, ...resultMapping };
    }
    if (providedMapping.profilePicture) {
      resultMapping = { [`${StandardAttribute.PICTURE_URL}`]: providedMapping.profilePicture.attributeName, ...resultMapping };
    }
    if (providedMapping.timezone) {
      resultMapping = { [`${StandardAttribute.TIMEZONE}`]: providedMapping.timezone.attributeName, ...resultMapping };
    }
    if (providedMapping.website) {
      resultMapping = { [`${StandardAttribute.WEBSITE}`]: providedMapping.website.attributeName, ...resultMapping };
    }
  }
}