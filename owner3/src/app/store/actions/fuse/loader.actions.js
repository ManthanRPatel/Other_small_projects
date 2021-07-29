export const SHOW_LOADER = '[HUMAN RESOURCES APP] SHOW LOADER';

export function showLoader(loader_name, status) {
    // console.log('called showLoader in loader actions... :',loader_name, status)
    return {
        type: SHOW_LOADER,
        payload: { 'name': loader_name, 'status': status }
    }
}