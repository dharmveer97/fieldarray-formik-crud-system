import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_OPERATIONS = [
  'Me',
  'UpdateProfile',
  'CompleteProfile',
  'ListUsers',
]

interface GraphQLRequest {
  query: string
  variables?: Record<string, unknown>
  operationName?: string
}

export async function POST(req: NextRequest) {
  const graphqlUri = process.env.GRAPHQL_URI
  const graphqlApiKey = process.env.GRAPHQL_API_KEY

  if (!graphqlUri || !graphqlApiKey) {
    return NextResponse.json(
      { errors: [{ message: 'Server configuration error' }] },
      { status: 500 },
    )
  }

  try {
    const body = (await req.json()) as GraphQLRequest
    const authorization = req.headers.get('authorization')
    const operationName = body.operationName

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    // console.log('authorizaiton :- ', authorization)
    // 🔐 Protected → Authorization ONLY
    if (
      authorization &&
      operationName &&
      PROTECTED_OPERATIONS.includes(operationName)
    ) {
      headers.Authorization = authorization
    }
    // 🌍 Public → API key ONLY
    else {
      headers['x-api-key'] = graphqlApiKey
    }

    const response = await fetch(graphqlUri, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    const data = await response.text()

    return new NextResponse(data, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch {
    return NextResponse.json(
      { errors: [{ message: 'Internal server error' }] },
      { status: 500 },
    )
  }
}
