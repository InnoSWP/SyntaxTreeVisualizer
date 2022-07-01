export function is_const(expr)
{
    if (expr.type === "Literal")
        return true;

    if (expr.type !== "BinaryExpression")
        return false;

    return is_const(expr.left) && is_const(expr.right);
}

export function can_fold(expr)
{
    if (expr.type === "Literal")
        return false;

    return is_const(expr);
}
