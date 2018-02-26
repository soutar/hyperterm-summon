let dockVisibilityTO;

module.exports = (dock, { hide }) => {
  if (!dock) {
    return;
  }
  clearTimeout(dockVisibilityTO);
  switch (true) {
    case hide && dock.isVisible():
      dockVisibilityTO = setTimeout(dock.hide, 1000);
      break;
    case !hide && !dock.isVisible():
      dockVisibilityTO = setTimeout(dock.show, 1000);
      break;
    default:
      break;
  }
};
