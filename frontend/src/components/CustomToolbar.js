import React from "react";

const CustomToolbar = () => (
  <div id="toolbar">
    {/* Text Formatting */}
    <select className="ql-size">
      <option value="small" />
      <option selected />
      <option value="large" />
      <option value="huge" />
    </select>
    <select className="ql-color">
      <option value="black" />
      <option value="red" />
      <option value="blue" />
      <option value="green" />
      <option value="yellow" />
      <option value="orange" />
    </select>
    <select className="ql-background" />
    <button className="ql-bold" />
    <button className="ql-italic" />
    <button className="ql-underline" />

    {/* Text Alignment */}
    <button className="ql-align" value="" />
    <button className="ql-align" value="center" />
    <button className="ql-align" value="right" />
    <button className="ql-align" value="justify" />
  </div>
);

export default CustomToolbar;
