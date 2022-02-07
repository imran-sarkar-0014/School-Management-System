import axios from "axios";

// const baseUrl = 'http://localhost:5000/'
// const baseUrl = 'http://192.168.0.153:5000/'
const baseUrl = '/'


const publicApi = axios.create({
    baseURL: baseUrl,
    headers: { 'X-Custom-Header': 'foobar' }
});

const privateApi = axios.create({
    baseURL: baseUrl,
    headers: { 'X-Custom-Header': 'foobar' }
});

// request for registration a new user

export const registration = async (data, callback, fallback) => {
    try {
        const result = await publicApi.post('/auth/register', data)
        callback(result.data)
    } catch (e) {

        console.log(e.response.data.keyValue.email)

        const getMessage = () => {

            if (e?.response?.data?.data?.keyValue?.email !== null)
                return `${e.response.data.keyValue.email} this email has already been taken.`
            else
                return 'Registration Failure'
        }

        fallback(getMessage())
    }
}

export const login = async (data, callback, fallback) => {
    try {
        const result = await publicApi.post('/auth/login', {
            email: data.email,
            password: data.password,
            type: data.type
        })

        callback(result.data)

    } catch (e) {
        console.log(e)
        fallback('Login Failure')
    }
}


// get user data

export const setAuthorization = (token) => {
    privateApi.defaults.headers.common['Authorization'] = `token ${token}`;
}

// get user driver method
const getUser = async (url, callback, fallback) => {
    try {
        const result = await privateApi.get(url)
        callback(result.data)
    } catch (e) {
        console.log(e)
        fallback(e)
    }
}

export const getStudent = (callback, fallback) => {
    getUser(
        '/user/st-user',
        callback,
        fallback
    )
}

export const getTeacher = (callback, fallback) => {
    getUser(
        '/user/tech-user',
        callback,
        fallback
    )
}

export const getAdmin = (callback, fallback) => {
    getUser(
        '/user/admin-user',
        callback,
        fallback
    )
}

// get all pending registrations of students
export const getPendingStudents = async (callback, fallback) => {
    try {
        const result = await privateApi.get('/auth/registrations/students')
        callback(result.data)
    } catch (e) {
        console.log(e)
        fallback(e)
    }
}

// get all pending teacher
export const getPendingTeachers = async (callback, fallback) => {
    try {
        const result = await privateApi.get('/auth/registrations/teachers')
        callback(result.data)
    } catch (e) {
        console.log(e)
        fallback(e)
    }
}

// get all pending Admins
export const getPendingAdmins = async (callback, fallback) => {
    try {
        const result = await privateApi.get('/auth/registrations/admins')
        callback(result.data)
    } catch (e) {
        console.log(e)
        fallback(e)
    }
}


// accept any admission
export const acceptRegistration = async (data, callback) => {
    try {

        const response = await privateApi.put('/auth/accept', {
            id: data.id,
            value: data.value
        })
        callback(response.data)

    } catch (e) {
        console.log(e)
    }
}

// delete an admission by it's id 
export const deleteAdmission = async (id, callback) => {

    try {
        const result = await privateApi.delete(`/auth/admission/${id}`)

        callback(result.data)

    } catch (e) {
        console.log(e)
    }
}

////////////////////////////////////////////////////////////////////////////////

export const getAdmins = async (callback) => {
    try {
        const response = await privateApi.get('/user/admins')
        callback(response.data)

    } catch (e) {
        console.log(e)
    }
}

export const getTeachers = async (callback) => {
    try {
        const response = await privateApi.get('/user/teachers')
        callback(response.data)
    } catch (e) {
        console.log(e)
    }
}

export const classStudents = async (className, callback) => {
    try {
        const res = await privateApi.post('/user/class-students', {
            className: className
        })

        callback(res.data)

    } catch (e) {
        console.log(e)
    }
}

export const getTotalStudents = async (callback) => {
    try {
        const response = await privateApi.get('/user/total-students')

    } catch (e) {
        console.log(e)
    }
}

export const getStudentFee = async (data, callback, fallback) => {
    try {
        const res = await privateApi.post('/transitions/get-student-fee/' + data.id, {
            total: data.amount
        })
        callback(res.data)

    } catch (e) {
        fallback(e?.response?.data || 'Transition Fail.')
    }
}

export const payTeacherSalary = async (data, callback, fallback) => {
    try {
        const response = await privateApi.post(`/transitions/pay-teacher-salary/${data.id}`, {
            amount: data.amount
        })
        callback(response.data)
    } catch (e) {
        console.log(e)
        fallback(e?.response?.data || 'Transition Fail.')
    }
}


export const payAdminSalary = async (data, callback, fallback) => {
    try {
        const response = await privateApi.post(`/transitions/pay-admin-salary/${data.id}`, {
            amount: data.amount
        })
        callback(response.data)
    } catch (e) {
        console.log(e)
        fallback(e?.response?.data || 'Transition Fail.')
    }
}


////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

export const getNotices = async (callback) => {
    try {
        const response = await privateApi.get('/notice')
        callback(response.data)
    } catch (e) {
        console.log(e)
    }
}

export const postNotice = async (data, callback, fallback) => {
    try {

        const response = await privateApi.post('/notice', {
            header: data.header,
            body: data.body
        })

        callback(response.data)
    } catch (e) {
        console.log(e)
        fallback(e?.response?.data || 'Adding notice fail.')
    }
}

export const updateNotice = async (id, data, callback, fallback) => {
    try {
        const response = await privateApi.put(`/notice/${id}`, {
            header: data.header,
            body: data.body
        })

        callback(response.data)
    } catch (e) {
        console.log(e)
        fallback(e?.response?.data || 'notice update fail.')
    }
}

export const deleteNotice = async (id, callback, fallback) => {
    try {
        const response = await privateApi.delete(`/notice/${id}`)
        callback(response.data)
    } catch (e) {
        console.log(e)
        fallback(e?.response?.data || 'notice delete fail.')
    }
}


////// attendance

export const getAttendance = async (data, callback) => {
    try {

        const response = await privateApi.get(`/attendance/${data.className.toString().replace(' ', '_')}?limit=${30}`)
        callback(response.data)

    } catch (e) {
        console.log(e)
    }
}


export const postAttendance = async (data, callback, fallback) => {
    try {

        const response = await privateApi.post('/attendance', {
            ...data
        })

        callback(response.data)
    } catch (e) {
        console.log(e)
        fallback(e)
    }
}

export const updateAttendance = async (data, callback, fallback) => {
    try {
        const response = await privateApi.put(`/attendance/${data._id}`, {
            className: data.className,
            date: data.date,
            attendances: data.attendances
        })

        callback(response.data)

    } catch (e) {
        console.log(e)
        fallback(e?.response?.data || 'Attendance updating error.')
    }
}

export const deleteAttendance = async (id, callback, fallback) => {
    try {

        const response = await privateApi.delete(`/attendance/${id}`)
        callback(response.data)

    } catch (e) {
        console.log(e)
        fallback(e?.response?.data || 'Error Deleting...')
    }
}

export const transDetails = async (id, callback) => {
    try {

        const response = await privateApi.get(`user/transition/${id}`)
        callback(response.data)

    } catch (e) {
        console.log(e)
    }
}

/////////////////
/////////////////
/////////////////
/////////////////
/////////////////
/////////////////
export const getFund = async (callback) => {

    try {
        const response = await privateApi.get('/transitions/fund')
        callback(response.data)
    } catch (e) {
        console.log(e)
    }
}

export const updateFund = async (data, callback, fallback) => {
    try {

        const response = await privateApi.post("/transitions/fund", data)
        callback(response.data)
    } catch (e) {
        console.log(e)
        fallback(e?.response?.data || "Error on updating...")
    }
}

export const updateMonth = async (callback, fallback) => {
    try {
        const response = await privateApi.put('/transitions/update-month')
        callback(response.data)

    } catch (e) {
        console.log(e)
        fallback(e?.response?.data || "Updating Error")
    }
} 