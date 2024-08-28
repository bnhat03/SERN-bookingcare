export const adminMenu = [
    { // Quản lý người dùng
        name: 'menu.admin.manage-user', 
        menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage' // CRUD User theo state của React (chưa dùng Redux)
            }, 
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux' // CRUD theo Redux
            }, 
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            }, 
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' // Quản lý lịch khám bệnh của bác sĩ => Admin + Doctor có chức năng ni
            }, 
                
        ]
    }, 
    { // Quản lý phòng khám
        name: 'menu.admin.clinic', 
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic' // CRUD User theo state của React (chưa dùng Redux)
            }, 

        ]
    }, 
    { // Quản lý chuyên khoa
        name: 'menu.admin.specialty', 
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty' // CRUD User theo state của React (chưa dùng Redux)
            }, 

        ]
    }, 
    { // Quản lý cẩm nang
        name: 'menu.admin.handbook', 
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook' // CRUD User theo state của React (chưa dùng Redux)
            }, 

        ]
    }, 
];

export const doctorMenu = [
    { 
        name: 'menu.admin.manage-user', 
        menus: [
            { // Quản lý lịch khám bệnh của bác sĩ => Admin + Doctor có chức năng ni
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' 
            }, 
            { 
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient' 
            }, 
                
        ]
    }, 
];