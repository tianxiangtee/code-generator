import { ACTION_TYPE } from 'common/constant/action_type';
import { v4 as uuid } from 'uuid';

export function generateAudit(
  model,
  modelName,
  clonesource_ref_id = null,
  clonesource_info = null,
) {
  const details = {
    ref_id: model.ref_id,
    clonesource_info,
  };

  const audit = {
    ref_id: uuid(),
    created_by: model.updated_by,
    created_by_name: model.updated_by_name,
    modified_by: model.updated_by,
    modified_by_name: model.updated_by_name,
    organization_id: model.organization_id,
    user_id: model.user_id,
    username: model.username,
    faults: model.faults || [],
    module: modelName || model.collection.name,
    details: details,
    changes:
      clonesource_ref_id == null
        ? []
        : [
            {
              field: 'ref_id',
              old_value: clonesource_ref_id,
              new_value: model.ref_id,
            },
          ],
    action_type:
      clonesource_ref_id == null ? ACTION_TYPE.CREATE : ACTION_TYPE.CLONE,
  };
  return audit;
}

type Change = {
  fieldName: string;
  oldValue: any;
  newValue: any;
};

function identifyChanges(oldDoc: object, newDoc: object): Change[] {
  const changes: Change[] = [];

  for (const field in newDoc) {
    if (oldDoc[field] !== newDoc[field]) {
      changes.push({
        fieldName: field,
        oldValue: oldDoc[field],
        newValue: newDoc[field],
      });
    }
  }

  return changes;
}
