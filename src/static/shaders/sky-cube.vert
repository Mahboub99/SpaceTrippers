#version 300 es
layout(location=0) in vec3 position;
// Note that we don't need anything except the position so we don't use the texture coordinates and we don't do reflection or refraction

out vec3 v_view;

uniform mat4 M;
uniform mat4 VP;
uniform vec3 cam_position;


void main(){
    vec4 world = M * vec4(position, 1.0f);
    gl_Position = (VP * world).xyww; 
    v_view = world.xyz - cam_position;
}