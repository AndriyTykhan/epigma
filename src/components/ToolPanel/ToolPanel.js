// @flow
import React from "react"

import { changeMode, undoShape } from "../../actions"
import { getEditorMode } from "../../reducers"
import { compose, withHandlers } from "recompose"
import { connect } from "react-redux"

import BEM from "../../utils/BEM"
import "./ToolPanel.scss"

const b = BEM("ToolPanel")

const ToolPanel = ({ isCreateToggledOn, toggleCreateMode }) => (
  <aside className={b()}>
    <button
      className={b("control", {
        "create-shape": true,
        "toggled-on": isCreateToggledOn
      })}
      onClick={toggleCreateMode}
    >
      DRAW
    </button>
    <button className={b("control", ["undo"])}>UNDO</button>

    <div className={b("doc-name")} />
  </aside>
)

const enhancer = compose(
  connect(
    state => ({
      isCreateToggledOn: getEditorMode(state) === "CREATE"
    }),
    { changeMode, undoShape }
  ),
  withHandlers({
    toggleCreateMode: ({ isCreateToggledOn, changeMode }) => () =>
      isCreateToggledOn ? changeMode("VIEW") : changeMode("CREATE")
  })
)

export default enhancer(ToolPanel)
