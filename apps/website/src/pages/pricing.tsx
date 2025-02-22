import * as React from 'react'

import Script from 'next/script'

import {
  Badge,
  Box,
  Button,
  CardHeader,
  Center,
  IconButton,
  SimpleGrid,
  Tag,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react'
import {
  Heading,
  Text,
  HStack,
  VStack,
  Stack,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react'

import Section from '@/components/marketing/section-wrapper'
import SectionTitle from '@/components/marketing/section-title'

import SEO from '@/components/seo'
import { CheckIcon } from '@chakra-ui/icons'
import { ButtonLink } from '@/components/link'

import { Faq } from '@/components/faq'

import { Testimonials } from '@/components/testimonials'

import { BackgroundGradientRadial } from '@/components/background-gradient-radial'
import { Br } from '@saas-ui/react'
import CodePanel from '@/components/code-panel/code-panel'
import { FiCheck, FiCopy } from 'react-icons/fi'
import { SignupForm } from '@/components/signup-form'

const PricingPage = () => {
  return (
    <Box>
      <SEO
        title="Saas UI"
        description="The React component library for Startups"
        titleTemplate="%s - Pricing"
      />
      <Script
        id="paritydeals-js"
        strategy="afterInteractive"
        src="https://cdn.paritydeals.com/banner.js"
      />
      <Script
        id="lemon-js"
        strategy="afterInteractive"
        src="https://app.lemonsqueezy.com/js/lemon.js"
        onLoad={() => {
          /* @ts-ignore */
          // window.createLemonSqueezy?.()
        }}
      />
      <BackgroundGradientRadial
        top="-30%"
        bottom="auto"
        opacity="0.3"
        _dark={{ opacity: 0.5 }}
      />
      <Box mb={8} w="full" position="relative" overflow="hidden">
        <Pricing />

        <Faq />

        <Testimonials />
      </Box>
    </Box>
  )
}

const getPaymentLinks = (
  append?: boolean
): {
  figma: string
  bootstrap: string
  startup: string
  className?: string
} => {
  const aff = typeof localStorage !== 'undefined' && localStorage.getItem('aff')
  let affix = ''
  if (append && aff) {
    affix = `?aff=${aff}`
  }
  return {
    figma: `https://saas-ui.lemonsqueezy.com/checkout/buy/f01bee85-aa4f-4de9-8e20-f53b0206b26f${affix}`,
    bootstrap: `https://saas-ui.lemonsqueezy.com/checkout/buy/5c76854f-738a-46b8-b32d-932a97d477f5${affix}`,
    startup: `https://saas-ui.lemonsqueezy.com/checkout/buy/bda4c7f4-e012-4956-96eb-e0efca6b91b0${affix}`,
    // className: 'lemonsqueezy-button',
  }
}

const Install = () => {
  const { value, onCopy, hasCopied } = useClipboard(
    'npm install @saas-ui/react'
  )
  return (
    <Center>
      <HStack py="1" px="2" borderRadius="full" bg="code-bg" borderWidth="1px">
        <CodePanel language="bash">{value}</CodePanel>
        <IconButton
          icon={hasCopied ? <FiCheck /> : <FiCopy />}
          aria-label="copy"
          onClick={onCopy}
          variant="ghost"
          borderRadius="full"
          color="white"
        />
      </HStack>
    </Center>
  )
}

const Pricing = () => {
  const [paymentLinks, setPaymentLinks] = React.useState(getPaymentLinks())

  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_PAYMENT === 'lemon') {
      /* @ts-ignore */
      window.createLemonSqueezy?.()
    }
  }, [])

  React.useEffect(() => {
    setPaymentLinks(getPaymentLinks(true))
  }, [])

  const figma = useDisclosure()

  return (
    <Section id="pricing" pos="relative" innerWidth="container.xl">
      <Box zIndex="2" pos="relative">
        <SectionTitle
          title="Pricing for every stage"
          description={
            <>
              <Text fontSize="xl" mb="12" color="muted">
                Get started for free with 50+ open source components. Upgrade to
                Pro <Br display={{ sm: 'none', lg: 'inline' }} />
                to get all components and features with a license for you or
                your team.
              </Text>
              <Install />
            </>
          }
          pt={{ base: '8', lg: '10' }}
          pb="12"
        />

        <SignupForm isOpen={figma.isOpen} onClose={figma.onClose} />

        <SimpleGrid columns={[1, null, 2, 4]} spacing={4}>
          <PricingBox
            title={
              <HStack as="span">
                <Text as="span">Design</Text>{' '}
                <Tag colorScheme="primary" size="sm">
                  New
                </Tag>
              </HStack>
            }
            description="Comprehensive Figma design system."
            price={
              <HStack>
                <Text
                  textDecoration="line-through"
                  fontSize="sm"
                  color="gray.400"
                >
                  $99,-
                </Text>
                <Text>49,-</Text>
              </HStack>
            }
          >
            <PricingFeatures>
              <PricingFeature
                title="One editor"
                help="One editor per license, you can buy as many licenses as you need. Licenses can be transfered."
              />
              <PricingFeature
                title="Unlimited projects"
                help="You can design unlimited projects."
              />
              <PricingFeature title="50+ components" />
              <PricingFeature title="3000+ variants" />
              <PricingFeature title="Auto-layout" />
              <PricingFeature title="Theming with Figma variables" />
              <PricingFeature title="Dark mode (soon)" color="muted" />
              <PricingFeature title="1 year of updates" />
            </PricingFeatures>
            <ButtonLink
              as="a"
              colorScheme="primary"
              href={paymentLinks.figma}
              className={paymentLinks.className}
              onClick={(e) => {
                setTimeout(() => {
                  /* @ts-ignore */
                  window?.pirsch?.('Order Figma')
                })
              }}
            >
              Early access
            </ButtonLink>
          </PricingBox>
          <PricingBox
            title="Bootstrap"
            price={
              <HStack>
                <Text
                  textDecoration="line-through"
                  fontSize="sm"
                  color="gray.400"
                >
                  €249,-
                </Text>
                <Text>€199,-</Text>
              </HStack>
            }
            description="Complete frontend stack for bootstrappers and small teams."
          >
            <PricingFeatures>
              <PricingFeature
                title="One developer"
                help="One developer per license, you can buy as many licenses as you need. Licenses can be transfered."
              />
              <PricingFeature
                title={<>Unlimited projects*</>}
                help="You can build and fail as many self hosted SaaS products as you like. Maximum 1 client project per license."
              />
              <PricingFeature title="Advanced components" />
              <PricingFeature title="Multiple themes" />
              <PricingFeature title="Next.js and Electron boilerplates" />
              <PricingFeature title="Private discord community" />
              <PricingFeature title="1 year of updates" />
              <PricingFeature
                title="Private beta access"
                iconColor="green.500"
              />
            </PricingFeatures>
            <ButtonLink
              as="a"
              colorScheme="primary"
              href={paymentLinks.bootstrap}
              className={paymentLinks.className}
              onClick={(e) => {
                setTimeout(() => {
                  /* @ts-ignore */
                  window?.pirsch?.('Order Bootstrap')
                })
              }}
            >
              Buy now
            </ButtonLink>
          </PricingBox>
          <PricingBox
            title="Startup"
            highlight="primary.500"
            price={
              <HStack>
                <Text
                  textDecoration="line-through"
                  fontSize="sm"
                  color="gray.400"
                >
                  €999,-
                </Text>
                <Text>€799,-</Text>
              </HStack>
            }
            description="Unlimited license for growing teams or agencies."
          >
            <PricingFeatures>
              <PricingFeature
                title="Up to 20 developers"
                help="A developer can be either an employee or a contracted freelancer."
              />
              <PricingFeature
                title="Unlimited projects"
                help="No restrictions on commercial projects or client work."
              />
              <PricingFeature title="Everything from Bootstrap" />
              <PricingFeature
                title={
                  <HStack as="span">
                    <Text as="span">Figma design system</Text>{' '}
                    <Tag colorScheme="primary" size="sm">
                      New
                    </Tag>
                  </HStack>
                }
              />
              <PricingFeature title="Prioritized feature requests" />
              <PricingFeature title="Priority support" />
              <PricingFeature title="Introduction call" />
              <PricingFeature title="1 year of updates" />
              <PricingFeature
                title="Private beta access"
                iconColor="green.500"
              />
            </PricingFeatures>
            <ButtonLink
              as="a"
              colorScheme="primary"
              href={paymentLinks.startup}
              className={paymentLinks.className}
              onClick={(e) => {
                setTimeout(() => {
                  /* @ts-ignore */
                  window?.pirsch?.('Order Startup')
                })
              }}
            >
              Buy now
            </ButtonLink>
          </PricingBox>
          <MemberShip />
        </SimpleGrid>

        <Text
          p="8"
          textAlign="center"
          color={useColorModeValue('gray.500', 'gray.400')}
        >
          VAT may be applicable depending on your location.
        </Text>
      </Box>
    </Section>
  )
}

const PricingFeatures = ({ children }) => {
  return (
    <VStack
      align="stretch"
      justifyContent="stretch"
      spacing="4"
      mb="8"
      flex="1"
    >
      {children}
    </VStack>
  )
}

const PricingFeature = ({
  title,
  iconColor = 'primary.500',
  help = '',
  color = 'inherit',
}) => {
  return (
    <HStack>
      <CheckIcon color={iconColor} />{' '}
      <Tooltip label={help}>
        <Text flex="1" fontSize="sm" cursor="default" color={color}>
          <Text
            as="span"
            borderStyle="dotted"
            borderBottomWidth={help ? '1px' : 'none'}
            borderColor="currentColor"
          >
            {title}
          </Text>
        </Text>
      </Tooltip>
    </HStack>
  )
}

const PricingBox = ({
  title,
  description,
  price,
  highlight = '',
  children,
  ...props
}) => {
  return (
    <VStack
      zIndex="2"
      backdropFilter="blur(100px)"
      transform="translate3d(0, 0, 0)"
      borderRadius="lg"
      p="8"
      flex="1 0"
      alignItems="stretch"
      position="relative"
      _before={{
        content: '""',
        display: 'block',
        pointerEvents: 'none',
        userSelect: 'none',
        position: 'absolute',
        inset: '0px',
        borderRadius: 'inherit',
        padding: '1px',
        bgGradient: highlight
          ? `linear(to-b, ${highlight}, transparent)`
          : 'linear(to-b, blackAlpha.200, transparent)',
        mask: 'linear-gradient(black, black) content-box content-box, linear-gradient(black, black)',
        maskComposite: 'exclude',
        WebkitMaskComposite: 'xor',
      }}
      _dark={{
        _before: {
          bgGradient: highlight
            ? `linear(to-b, ${highlight}, transparent)`
            : 'linear(to-b, whiteAlpha.300, transparent)',
        },
      }}
      {...props}
    >
      <Heading as="h3" size="md" fontWeight="bold" fontSize="lg" mb="2">
        {title}
      </Heading>
      <Box color={useColorModeValue('gray.500', 'gray.400')} fontSize="md">
        {description}
      </Box>
      <Box fontSize="2xl" fontWeight="bold" py="4">
        {price}
      </Box>
      <VStack align="stretch" justifyContent="stretch" spacing="4" flex="1">
        {children}
      </VStack>
    </VStack>
  )
}

const MemberShip = () => {
  return (
    <PricingBox
      title={
        <HStack>
          <Text>Membership</Text>
        </HStack>
      }
      description="Limited access membership for teams that want to get moving fast."
      price={
        <Stack spacing="0">
          <Text fontSize="sm" color="gray.400" fontWeight="medium">
            Starting at
          </Text>
          <HStack>
            <Text>€2499,-</Text>
            <Text fontSize="sm" color="gray.400">
              / month
            </Text>
          </HStack>
        </Stack>
      }
    >
      <PricingFeatures>
        <PricingFeature
          title={<strong>1 spot available</strong>}
          iconColor="green.400"
        />
        <PricingFeature title="Startup license included" iconColor="cyan.500" />
        <PricingFeature title="Project setup" iconColor="cyan.500" />
        <PricingFeature title="Design-system setup" iconColor="cyan.500" />
        <PricingFeature
          title="Custom component development"
          iconColor="cyan.500"
        />
        <PricingFeature title="Design services" iconColor="cyan.500" />
        <PricingFeature title="Private Slack/Discord" iconColor="cyan.500" />
        <PricingFeature title="Code reviews" iconColor="cyan.500" />
      </PricingFeatures>
      <Button
        colorScheme="cyan"
        onClick={() => {
          setTimeout(() => {
            /* @ts-ignore */
            window?.pirsch?.('Membership')
            /* @ts-ignore */
            $crisp.push(['do', 'chat:open'])
            /* @ts-ignore */
            $crisp.push(['do', 'message:thread:start', ['Membership']])
            /* @ts-ignore */
            $crisp.push([
              'do',
              'message:send',
              ['text', 'Hey! Thanks for your interest in Saas UI.'],
            ])
            /* @ts-ignore */
            $crisp.push([
              'do',
              'message:send',
              [
                'text',
                "Please share some information about your project and I'll get back to you asap. I'm also happy to plan a call to discuss your project.",
              ],
            ])
          })
        }}
      >
        Get in touch
      </Button>
    </PricingBox>
  )
}

export default PricingPage

export async function getStaticProps() {
  return {
    props: {
      header: {
        position: 'fixed',
        variant: 'dark',
      },
    },
  }
}
