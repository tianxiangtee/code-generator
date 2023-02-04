import { ACTION_TYPE } from 'common/constant/action_type';
import { v4 as uuid } from 'uuid';

export function generateAudit(
  model,
  modelName,
  clonesourceRefId = null,
  clonesourceInfo = null,
) {
  const details = {
    ref_id: model.ref_id,
    clonesource_info: clonesourceInfo,
  };

  const actionType =
    clonesourceRefId == null ? ACTION_TYPE.CREATE : ACTION_TYPE.CLONE;

  return {
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
    details,
    header_ref_id: model.header_ref_id || model.ref_id,
    changes:
      clonesourceRefId == null
        ? []
        : [
            {
              field: 'ref_id',
              old_value: clonesourceRefId,
              new_value: model.ref_id,
            },
          ],
    action_type: actionType,
  };
}

export function generateUpdateAudit(model, updatedModel) {
  const oldDocument = model;
  const newDocument = updatedModel;

  if (oldDocument == null || newDocument == null) {
    return;
  }

  let actionType = ACTION_TYPE.UPDATE;
  switch (newDocument.status) {
    case ACTION_TYPE.REJECTED:
    case ACTION_TYPE.SUBMITTED:
    case ACTION_TYPE.REGISTERED: {
      actionType = newDocument.status;
      break;
    }
  }

  return {
    ...generateAudit(newDocument, model.collection.name),
    changes: identifyChanges(oldDocument, newDocument),
    action_type: actionType,
  };
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
