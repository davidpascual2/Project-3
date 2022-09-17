export const getSavedPropertyIds = () => {
    const savedPropertyIds = localStorage.getItem('saved_properties')
      ? JSON.parse(localStorage.getItem('saved_properties'))
      : [];
  
    return savedPropertyIds;
  };
  
  export const savePropertyIds = (propertyIdArr) => {
    if (propertyIdArr.length) {
      localStorage.setItem('saved_properties', JSON.stringify(propertyIdArr));
    } else {
      localStorage.removeItem('saved_properties');
    }
  };
  
  export const removePropertyId = (propertyId) => {
    const savedPropertyIds = localStorage.getItem('saved_properties')
      ? JSON.parse(localStorage.getItem('saved_properties'))
      : null;
  
    if (!savedPropertyIds) {
      return false;
    }
  
    const updatedSavedPropertyIds = savedPropertyIds?.filter((savedPropertyId) => savedPropertyId !== propertyId);
    localStorage.setItem('saved_properties', JSON.stringify(updatedSavedPropertyIds));
  
    return true;
  };
