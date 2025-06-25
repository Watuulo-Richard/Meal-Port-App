'use server';

import { axiosAPI } from '@/config/axios';
import { CategoryFormData, MealTypes } from '@/schema/schema';
import { baseUrl, UpdateCategoryTypes, UpdateMealTypes } from '@/types/types';
import { User } from '@prisma/client';
export async function fetchMealCategories() {
  try {
    const response = await axiosAPI.get('/categoryAPI');
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchSingleCategory(slug: string){
  try {
    const response = await axiosAPI.get(`/categoryAPI/${slug}`)
    // console.log(response.data);
    return response.data.data
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createCategoryAction(data: CategoryFormData) {
  try {
    const response = await axiosAPI.post('/categoryAPI', data);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// const mealsProductsAPI = `${baseUrl}/api/v1/mealsAPI`;
export async function fetchMeals() {
  try {
    const response = await axiosAPI.get('/mealsAPI')
    // console.log(response.data);
    return response.data
  } catch (error) {
    console.log(error);
    return []
  }
}

export async function fetchSingleMeal(slug: string) {
  
  try {
    const response = await axiosAPI.get(`/mealsAPI/${slug}`)
    // console.log(response.data);
    return response.data.data
  } catch (error) {
    console.log(error);
    return null
  }
}

export async function createMealAction(data: MealTypes) {
  try {
    const response = await axiosAPI.post('/mealsAPI', data);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateCategoryAction(slug: string, data:UpdateCategoryTypes) {
  try {
    const response = await axiosAPI.patch(`/categoryAPI/${slug}`, data)
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateMealAction(slug: string,  data: Partial<UpdateMealTypes >) {
  try {
    const response = await axiosAPI.patch(`/mealsAPI/${slug}`, data)
    // console.log(response.data);
    return response.data
  } catch (error) {
    console.log(error);
    return null
  }
}

export async function getUserAction(id: string) {
  const getUserAPIRoute = `${baseUrl}/api/v1/signUpAPI/${id}`
  try {
    const response = await fetch(getUserAPIRoute)
    const fetchedUser = await response.json()
    // console.log(fetchedUser.data);
    return fetchedUser.data as User
  } catch (error) {
    console.log(error);
    return null
  }
}
