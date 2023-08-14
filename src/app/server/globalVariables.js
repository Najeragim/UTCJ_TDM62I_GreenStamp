let selectedClaseId = null;

module.exports = {
  getSelectedClaseId: () => selectedClaseId,
  setSelectedClaseId: (id) => { selectedClaseId = id; }
};
