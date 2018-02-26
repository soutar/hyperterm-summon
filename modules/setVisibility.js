let dockVisibilityTO;

module.exports = (dock, { hide }) => {
  clearTimeout(dockVisibilityTO);
  dockVisibilityTO = setTimeout(hide ? dock.hide : dock.show, 1000);
};
