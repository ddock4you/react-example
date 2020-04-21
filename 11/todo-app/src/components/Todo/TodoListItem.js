import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle, style, onModify }) => {
  const { id, text, checked, isModifying } = todo;

  return (
    <div
      className="TodoListItem-virtualized"
      style={style}
      // isMody={isModifying}
    >
      <div className="TodoListItem">
        <div
          className={cn('checkbox', { checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <button
          type="button"
          onClick={() => {
            onModify(id, text, isModifying);
          }}
        >
          {isModifying ? '수정완료' : '수정'}
        </button>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);
