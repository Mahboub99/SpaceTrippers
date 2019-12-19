#version 300 es

// Since we have no buffers to contain the vertices, we can store them here in a constant vec3 array
const vec3 vertices[3] = vec3[3]( 
    vec3(-1.0f, -1.0f, 0.0f),
    vec3( 3.0f, -1.0f, 0.0f),
    vec3(-1.0f,  3.0f, 0.0f)
);
// Note that the vertex coordinates exceed the NDC limits (-1 to 1) since we need to use only one triangle to cover the whole screen

out vec2 v_screencoord; // The texture coordinates of the screen (bottom-left 0,0 ... top-right 1,1)

void main(){
    // Pick a vertex from the constant array and send it.
    vec3 vertex = vertices[gl_VertexID];
    gl_Position = vec4(vertex, 1.0f);
    v_screencoord = 0.5 * (vertex.xy + 1.0); // remapping the NDC from [-1, 1] to [0, 1] will give us the screen texture coordinates
}

// Note: this shader will be used with every post processing shader program