
import {ScopeItem, ResourceType, CreateSubjectType} from '../../types';

interface AccessRightCreationTemplate {
  resourceId: string;
  scope: readonly ScopeItem[];
  subjectId: string;
  subjectType: CreateSubjectType;
  resourceType: ResourceType;
}

interface AccessRightDeletionParams {
  resourceId: string;
  scope: readonly ScopeItem[];
  subjectId: string;
  subjectType: CreateSubjectType;
  resourceType: ResourceType;
}

export type {
  AccessRightCreationTemplate,
  AccessRightDeletionParams,
};
