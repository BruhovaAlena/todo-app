import React from 'react';
import { Enum_Todoitem_Priority } from '../strapi/types';

const PriorityMapper = {
  [Enum_Todoitem_Priority.Priority1]: 'Low',
  [Enum_Todoitem_Priority.Priority2]: 'Medium',
  [Enum_Todoitem_Priority.Priority3]: 'High',
};

type PriorityLabelProps = {
  priority: Enum_Todoitem_Priority;
};

const PriorityLabel = ({ priority }: PriorityLabelProps) => {
  return (
    <div
      className={`px-2 py-1 rounded-md w-20 text-center font-bold text-white bg-blue-400`}
    >
      {PriorityMapper[priority]}
    </div>
  );
};

export default PriorityLabel;
