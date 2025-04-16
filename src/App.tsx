import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AutoForm, StepConfig } from "@/components/custom/auto_form";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <p>logo</p>
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="/docs">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

// Define the schema for the entire form
const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  subject: z.string().min(1, "Assunto é obrigatório"),
  subject_obs: z.string().optional(),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
  contactPreference: z.string().min(1, "Preferência de contato é obrigatória"),
  newsletter: z.boolean().optional(),
  subject_others: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "Você deve aceitar os termos e condições",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Single step configuration example
const singleStepConfig: StepConfig = {
  title: "Contact Information",
  description: "Please provide your contact details",
  fields: {
    name: {
      label: "Full Name",
      placeholder: "Enter your full name",
      description: "Please provide your legal name",
      type: "text",
    },
    email: {
      label: "Email Address",
      placeholder: "your.email@example.com",
      type: "email",
    },
    phone: {
      label: "Phone Number",
      placeholder: "(555) 123-4567",
      type: "text",
    },
    message: {
      label: "Your Message",
      placeholder: "How can we help you?",
      type: "textarea",
      description: "Please be as detailed as possible",
    },
    priority: {
      label: "Priority Level",
      type: "select",
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
      ],
    },
    subscribe: {
      label: "Subscribe to newsletter",
      type: "checkbox",
      description: "Receive updates about our products and services",
    },
  },
};

const multiStepConfig: StepConfig[] = [
  {
    title: "Informações Pessoais",
    description: "Por favor, forneça suas informações básicas",
    fields: {
      name: {
        label: "Nome Completo",
        placeholder: "Digite seu nome completo",
        popover: (
          <div>
            <h3 className="font-medium mb-1">Nome Completo</h3>
            <p className="text-sm text-muted-foreground">
              Por favor, insira seu nome completo como consta em seus documentos
              oficiais.
            </p>
          </div>
        ),
      },
      email: {
        label: "Email",
        placeholder: "Digite seu email",
        type: "email",
      },
      phone: {
        label: "Telefone",
        placeholder: "Digite seu telefone",
      },
    },
  },
  {
    title: "Detalhes do Contato",
    fields: {
      subject: {
        label: "Assunto",
        type: "select",
        options: [
          { label: "Dúvida", value: "question" },
          { label: "Sugestão", value: "suggestion" },
          { label: "Reclamação", value: "complaint" },
          { label: "Outro", value: "other" },
        ],
        popover: (
          <div>
            <h3 className="font-medium mb-1">Assunto</h3>
            <p className="text-sm text-muted-foreground">
              Selecione o assunto que melhor descreve sua mensagem.
            </p>
          </div>
        ),
      },
      message: {
        label: "Mensagem",
        placeholder: "Digite sua mensagem",
        type: "textarea",
      },
    },
  },
  {
    title: "Preferências",
    fields: {
      contactPreference: {
        label: "Como prefere ser contatado?",
        type: "radio",
        options: [
          { label: "Email", value: "email" },
          { label: "Telefone", value: "phone" },
          { label: "WhatsApp", value: "whatsapp" },
        ],
      },
      newsletter: {
        label: "Deseja receber nossa newsletter?",
        type: "checkbox",
      },
    },
  },
  {
    title: "Confirmação",
    fields: {
      terms: {
        label: "Concordo com os termos e condições",
        type: "checkbox",
      },
    },
  },
];

function App() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      contactPreference: "",
      subject_others: "",
      newsletter: false,
      terms: false,
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <>
      <NavigationMenuDemo />

      <div className="container mx-16 mt-10">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AutoForm schema={contactSchema} fieldConfig={singleStepConfig} />
          </form>
        </FormProvider>
      </div>
    </>
  );
}

export default App;
