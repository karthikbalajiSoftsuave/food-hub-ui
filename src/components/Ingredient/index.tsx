import React, { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import "./styles.scss";

export interface IIngredient {
    item: string,
    key: any
    quantity: string
}
type Tprops = {
    onChange: (ingredientArr: IIngredient[]) => void
}
const Ingredients: React.FC<Tprops> = ({onChange}) => {
    const [ingredientArr, setTngredientArr] = useState<IIngredient[]>([]);
    const emptyIngredient: IIngredient = { item: "", quantity: "", key: 0 }
    const handleOnAddIngredient = () => {
        setTngredientArr((ingredientArr) => {
           const arr =  [...ingredientArr, { ...emptyIngredient, key: new Date() }]
            onChange(arr);
            return arr;
        })
       ;
    }
    const handleOnRemove = (index: number) => {
        const finalResult: IIngredient[] = JSON.parse(JSON.stringify(ingredientArr));
        const filterElement = finalResult?.filter((ingredient) => ingredient?.key !== index);
        onChange(filterElement);
        setTngredientArr(() => filterElement);
    }
    const handleOnEditItem = (value: any, key: number) => {
        const ingArr: IIngredient[] = JSON.parse(JSON.stringify(ingredientArr));
        ingArr[key].item = value;
        onChange(ingArr);
        setTngredientArr(ingArr);
    }
    const handleOnEditQuantity = (value: any, key: number) => {
        const ingArr: IIngredient[] = JSON.parse(JSON.stringify(ingredientArr));
        ingArr[key].quantity = value;
        onChange(ingArr);
        setTngredientArr(ingArr);
    }
    useEffect(() => {
        handleOnAddIngredient();
    }, [])
    return (
        <div className="ingredient-container">
            {ingredientArr?.map((ingredient, index) => <div className="ingredient" key={index}>
                <Input value={ingredient?.item} className="form-field" placeholder="Item" onChange={(evt) => handleOnEditItem(evt.target.value, index)} />
                <Input value={ingredient?.quantity} className="form-field" placeholder="quantity" onChange={(evt) => handleOnEditQuantity(evt.target.value, index)} />
                {ingredientArr?.length > 1 && <Button type="button" onClick={() => handleOnRemove(ingredient?.key)}> - </Button>}
            </div>)}
            <Button type="button" onClick={handleOnAddIngredient}> + Add Ingredient </Button>
        </div >
    )
}

export default Ingredients;