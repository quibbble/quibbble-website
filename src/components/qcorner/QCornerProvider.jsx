import { createContext, useEffect } from "react";
import { useQCorner } from "../../hooks/QCorner";

export const QCornerContext = createContext(null);

export function QCornerProvider({ children }) {

    const [qcorner, send] = useQCorner()

    return (
        <QCornerContext.Provider value={{ qcorner: qcorner, send: send }}>
            { children }
        </QCornerContext.Provider>
    )
}