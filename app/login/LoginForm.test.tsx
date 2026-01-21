import React from "react";
import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import {describe, it, expect, vi} from "vitest";
import "@testing-library/jest-dom/vitest"

// LoginForm calls useRouter() from next/navigation
// in tests, there is no Next.js App Router context, so useRouter() throws an error
// need to create a mock useRouter() using vi.mock
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        refresh: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        prefetch: vi.fn()
    }),
}));

describe("Login Form", () => {
    it("renders the Login Form", () => {
        render(<LoginForm />)
        expect(screen.getAllByText("Login")[0]).toBeInTheDocument();
    })
})