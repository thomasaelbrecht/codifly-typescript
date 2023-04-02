export type InterfaceSelectionPattern<T> =
    | void
    | (
        [T & {}] extends [(infer E)[]]
            ? InterfaceSelectionPattern<E>
            : {
                [K in keyof (T & {})]?: InterfaceSelectionPattern<(T & {})[K]>;
            }
    );

export type InterfaceSelection<T, P extends InterfaceSelectionPattern<T>> =
    [P,] extends [void]
        ? T
        :   | (null extends T ? null : never)
            | (undefined extends T ? undefined : never)
            | (
                [T & {}] extends [(infer E)[]]
                    ? InterfaceSelection<E, P & InterfaceSelectionPattern<E>>[]
                    : {
                        [K in keyof ((T | P) & {})]: InterfaceSelection<
                            (T & {})[K],
                            (P & {})[K] & InterfaceSelectionPattern<(T & {})[K]>
                        >;
                    }
            );
