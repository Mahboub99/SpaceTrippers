#version 300 es
layout(location=0) in vec3 position;
layout(location=1) in vec4 color;
layout(location=3) in vec3 normal; // Here we need the normals but we do not need the texture coordinates since cube textures are sampled via a direction

out vec4 v_color;
out vec3 v_view; // we will send the world-space view direction
out vec3 v_normal; // alongside the world-space normal to be able to calculate the relfected and refracted rays

uniform mat4 M;
uniform mat4 M_it;
uniform mat4 VP;
uniform vec3 cam_position;


void main(){
    vec4 world = M * vec4(position, 1.0f);
    gl_Position = VP * world; 
    v_color = color;
    v_view = world.xyz - cam_position;
    // First, Note that the homogenous component in the normals is 0 instead of 1 since a normal is a direction not a point so translating the objects shouldn't affect it its normals.
    // Second, Note that the normals are multiplied by the inverse transpose of the model matrix, since the normals are affected by rotation as is but should be affected by the inverse of the scaling.
    v_normal = (M_it * vec4(normal, 0.0f)).xyz;
}