export const adminMenu = [
    { //quanr lý người dùng
        name: 'menu.admin.manage-user', menus: [


            {
                name: 'menu.admin.manage-doctor',
                link: '/system/manage-doctor'

            },
            {
                name: 'menu.admin.manage-user',
                link: '/system/user-manage'

            },
            {
                name: 'menu.admin.crud-redux',
                link: '/system/user-redux'

            },

            {
                name: 'menu.doctor.manage-schedule',


                link: '/doctor/manage-schedule'


                // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },

            },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //quanr lý phòng khám
        name: 'menu.admin.clinic', menus: [

            {
                name: 'menu.admin.manage-clinic',
                link: '/system/manage-clinic'

            }
        ]
    },

    { //quanr lý cẩm nang
        name: 'menu.admin.specialty', menus: [

            {
                name: 'menu.admin.manage-specialty',
                link: '/system/manage-specialty'

            }
        ]
    },


];

export const doctorMenu = [
    {
        name: 'menu.doctor.tilte', menus: [
            {
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule'

            },
            {
                name: 'menu.doctor.manage-patient',
                link: '/doctor/manage-patient'

            }

            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },




];