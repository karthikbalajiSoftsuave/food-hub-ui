export type TRecipe = {
      id?: string,
      title: string,
      description: string,
      ingredients: string,
      cooking_time: string,
      preparationSteps: string,
      serving_size: number,
      category_id?: string
      avg_rating?:string
}

export type IRecipe = {
      preparationSteps: string
      createdAt: string
      description: string
      ingredients: string
      title: string
      cooking_time: string
      updatedAt: string
      serving_size: number
      __v: number
      _id: string
}