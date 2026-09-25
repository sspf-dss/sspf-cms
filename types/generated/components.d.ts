import type { Schema, Struct } from '@strapi/strapi';

export interface SharedContactPerson extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_people';
  info: {
    description: 'Named contact with role, email and phone';
    displayName: 'Contact Person';
    icon: 'phone';
  };
  attributes: {
    email: Schema.Attribute.Email;
    name: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeature extends Struct.ComponentSchema {
  collectionName: 'components_shared_features';
  info: {
    description: 'Icon, title and description card (activities page)';
    displayName: 'Feature';
    icon: 'star';
  };
  attributes: {
    descriptionMD: Schema.Attribute.RichText;
    icon: Schema.Attribute.Enumeration<
      ['cloud_arrow_up', 'lock_closed', 'arrow_path']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'cloud_arrow_up'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMember extends Struct.ComponentSchema {
  collectionName: 'components_shared_members';
  info: {
    description: 'Committee member; list order is the display order';
    displayName: 'Member';
    icon: 'user';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'>;
    position: Schema.Attribute.String;
  };
}

export interface SharedTimelineItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_timeline_items';
  info: {
    description: 'Milestone shown on the about page';
    displayName: 'Timeline Item';
    icon: 'clock';
  };
  attributes: {
    date: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'shared.contact-person': SharedContactPerson;
      'shared.feature': SharedFeature;
      'shared.member': SharedMember;
      'shared.timeline-item': SharedTimelineItem;
    }
  }
}
