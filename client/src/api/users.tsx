import { User } from "@/models/user";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export async function getLoggedInUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'GET',
        credentials: 'include',
    });
    
    if (response.ok) {
        return response.json();
        // console.log('User logged In', response.json());
    } else {
      const errorBody = await response.json();
      const errorMessage = errorBody.error;
      console.error('Login Failed:', errorMessage);
      throw Error(errorMessage);
    }
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/api/users/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }); 
    if (response.ok) {
        return response.json();
      } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error || 'Unknown error';
        console.error('Signup failed', errorMessage);
        throw Error(errorMessage);
    }; 
}

export interface LoginCredentials {
    username: string,
    password: string,
}
export async function login(credentials: LoginCredentials): Promise<User>  {
    // console.log('Sending login request with credentials:');

    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }); 
    console.log('Login response status:', response.status);
    
    if (response.ok) {
        return response.json();
        
      } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error || 'Unknown error';
        console.error('Login Failed:', errorMessage);
        throw Error(errorMessage);
    }
}


export async function logout() {
    await fetch(`${API_BASE_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
    });
}

export interface UpdateUserCredentials {
    username?: string,
    email?: string,
    password?: string,
    profilePic?: string, 
    address?: string,
    city?: string,
    country?: string,
}

export async function updateUser(userId: string, updates: FormData): Promise<User> {
    
    // const formData = new FormData();
    // Object.entries(updates).forEach(([key, value]) => {
    //     if(value !== undefined && value !== null) {
    //         formData.append(key, value);
    //     }
    // })
    
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: 'PATCH',
        credentials: 'include',
        body: updates,
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // body: JSON.stringify(updates),
    });

    if (response.ok) {
        return response.json();
       
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error || 'Unknown error';
        throw Error(errorMessage);
    }
}

export async function deleteUser(userId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/users/delete/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if(response.ok) {
        return;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error || "Unknown error";
        console.error('Delete failed', errorMessage);
        throw new Error(errorMessage);
    }
}