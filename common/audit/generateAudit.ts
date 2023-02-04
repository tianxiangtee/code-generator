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

export function generateUpdateAudit(model, updatedModel) {
  const oldDocument = model;
  const newDocument = updatedModel;

  console.log(oldDocument, newDocument);
  if (oldDocument == null || newDocument == null) {
    return;
  }
  const audit = generateAudit(newDocument, model.collection.name);
  switch (newDocument.status) {
    case ACTION_TYPE.REJECTED:
    case ACTION_TYPE.SUBMITTED:
    case ACTION_TYPE.REGISTERED: {
      audit.action_type = newDocument.status;
      break;
    }
    default:
      audit.action_type = ACTION_TYPE.UPDATE;
      break;
  }
  audit.changes = identifyChanges(oldDocument, newDocument);
  return audit;
}

function identifyChanges(oldDoc: object, newDoc: object) {
  const changes = [];

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
