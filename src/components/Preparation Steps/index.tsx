import React, { useEffect, useState } from "react";
import Button from "../Button";
import "./styles.scss";
import TextBox from "../TextBox";

export interface IPreparationSteps {
    step: number,
    key: any
    description: string
}
type Tprops = {
    onChange: (ingredientArr: IPreparationSteps[]) => void
}
const PreparationSteps: React.FC<Tprops> = ({ onChange }) => {
    const [ingredientArr, setTngredientArr] = useState<IPreparationSteps[]>([]);
    const emptyIngredient: IPreparationSteps = { description: "", step: 1, key: 0 }
    const handleOnAddIngredient = () => {
        setTngredientArr((ingredientArr) => {
            const arr = [...ingredientArr, { ...emptyIngredient, key: new Date() }]
            onChange(arr);
            return arr;
        })
            ;
    }
    const handleOnRemove = (index: number) => {
        const finalResult: IPreparationSteps[] = JSON.parse(JSON.stringify(ingredientArr));
        const filterElement = finalResult?.filter((ingredient) => ingredient?.key !== index);
        onChange(filterElement);
        setTngredientArr(() => filterElement);
    }

    const handleOnEditDescription = (value: any, key: number) => {
        const ingArr: IPreparationSteps[] = JSON.parse(JSON.stringify(ingredientArr));
        ingArr[key].description = value;
        onChange(ingArr);
        setTngredientArr(ingArr);
    }
    useEffect(() => {
        handleOnAddIngredient();
    }, [])
    return (
        <div className="ingredient-container">
            {ingredientArr?.map((ingredient, index) => <div className="ingredient" key={index}>
                <TextBox label={`Step - ${index + 1}`} rows={4} value={ingredient?.description} className="form-field" placeholder="" onChange={(evt) => handleOnEditDescription(evt.target.value, index)} />
                {ingredientArr?.length > 1 && <Button type="button" onClick={() => handleOnRemove(ingredient?.key)}> - </Button>}
            </div>)}
            <Button type="button" onClick={handleOnAddIngredient}> + Add Prepation Steps </Button>
        </div >
    )
}

export default PreparationSteps;