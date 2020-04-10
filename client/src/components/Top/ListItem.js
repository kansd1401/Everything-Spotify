import React from "react";
import classNames from 'classnames';


export default function ListItem(props) {
  const classes = classNames("age-list__item", {
    "age-list__item--selected": props.selected === props.name
  });

  return (
    <div onClick={() => props.setAge(props.name)} className={classes}>
      <h3 className="text--regular">{props.name}</h3> 
    </div>
  );
}