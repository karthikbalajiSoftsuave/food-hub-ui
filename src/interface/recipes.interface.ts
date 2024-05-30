export type TRecipe = {
      id?: string,
      title: string,
      description: string,
      ingredients: string,
      cooking_time: string,
      preparation_steps: string,
      serving_size: string,
      category_id?: string
      avg_rating?:string
}

export type IRecipe = {
      preparation_steps: string
      createdAt: string
      description: string
      ingredients: string
      title: string
      cooking_time: string
      updatedAt: string
      serving_size: string
      __v: number
      _id: string
}