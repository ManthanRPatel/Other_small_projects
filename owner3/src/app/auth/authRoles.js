/**
 * Authorization Roles
 */
// const authRoles = {
// 	admin: ['admin'],
// 	staff: ['admin', 'staff'],
// 	user: ['admin', 'staff', 'user'],
// 	onlyGuest: []
// };

const authRoles = {
    admin    : ['Admin'],
    staff    : ['Admin', 'Staff'],
    user     : ['Admin', 'Staff', 'User'],
    onlyGuest: []
};

export default authRoles;
