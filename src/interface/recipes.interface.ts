export type TRecipe = {
      id?: string,
      title: string,
      description: string,
      ingredients: string,
      cookingTime: string,
      preparationSteps: string,
      servingSize: number,
}

export type IRecipe = {
      preparationSteps: string
      createdAt: string
      description: string
      ingredients: string
      title: string
      cookingTime: string
      updatedAt: string
      servingSize: number
      __v: number
      _id: string
}