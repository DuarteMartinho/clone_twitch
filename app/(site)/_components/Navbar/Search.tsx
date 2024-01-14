"use client"

import qs from "query-string";
import { SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Search = () => {
    const [value, setValue] = useState("");
    const router = useRouter();

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!value) return;

        const url = qs.stringifyUrl({
            url: "/search",
            query: {
                q: value
            }
        }, {
            skipEmptyString: true,
            skipNull: true
        });

        router.push(url);
    }

    const onClear = () => {
        setValue("");
    }

    return (
        <form
            onSubmit={onSubmit}
            className="relative w-full lg:w-[400px] flex items-center"
        >
            <Input
                placeholder="Search"
                className="rounded-l-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {value && (
                <X
                    className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition"
                    onClick={onClear}
                />
            )}
            <Button
                type="submit"
                size="sm"
                variant="secondary"
                className="rounded-l-none"
            >
                <SearchIcon className="w-5 h-5 text-muted-foreground" />
            </Button>
        </form>
    );
}

export default Search;