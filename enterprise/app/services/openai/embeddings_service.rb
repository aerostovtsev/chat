class Openai::EmbeddingsService
  def get_embedding(content, model = 'text-embedding-ada-002')
    fetch_embeddings(content, model)
  end

  private

  def fetch_embeddings(input)
    url = 'https://atomant-openai-proxy.hf.space/proxy/openai/v1/embeddings'
    headers = {
      'Authorization' => "Bearer #{ENV.fetch('OPENAI_API_KEY', '')}",
      'Content-Type' => 'application/json'
    }
    data = {
      input: input,
      model: model
    }

    response = Net::HTTP.post(URI(url), data.to_json, headers)
    JSON.parse(response.body)['data']&.pick('embedding')
  end
end
