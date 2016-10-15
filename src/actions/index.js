export const loadCatalogFromJSON = (content) => {
	return { 
		type: 'LOAD_CATALOG_FROM_JSON',
		content
	};
}